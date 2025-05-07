import { getSession, useSession } from "next-auth/react";
import { useCallback } from "react";

interface FetchClientOptions extends RequestInit {
  skipAuth?: boolean;
}

export function useFetchClient() {
  const { data: session, status } = useSession();

  // Inside useFetchClient
  const fetchClient = useCallback(
    async <T = any>(
      url: string,
      options: FetchClientOptions = {}
    ): Promise<T> => {
      const { skipAuth, headers: customHeaders, ...restOptions } = options;
      const headers = new Headers(customHeaders);

      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      const token = session?.user.tokens.accessToken;

      if (token && !skipAuth) {
        headers.set("Authorization", `${token}`);
      }

      let res = await fetch(url, { ...restOptions, headers });

      if (res.status === 401 && !skipAuth) {
        const newSession = await getSession();

        if (newSession?.user.tokens.accessToken) {
          headers.set("Authorization", `${newSession.user.tokens.accessToken}`);
          res = await fetch(url, { ...restOptions, headers });
        }
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "An unknown error occurred");
      }

      return res.json();
    },
    [session]
  );

  return {
    fetchClient,
    isAuthenticated: status === "authenticated",
  };
}
