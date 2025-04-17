import { getSession, useSession } from "next-auth/react";
import { useCallback } from "react";

interface FetchClientOptions extends RequestInit {
  skipAuth?: boolean;
}

export function useFetchClient() {
  const { data: session, status } = useSession();

  const fetchClient = useCallback(
    async (url: string, options: FetchClientOptions = {}) => {
      const { skipAuth, headers: customHeaders, ...restOptions } = options;
      const headers = new Headers(customHeaders);

      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      const token = session?.user.tokens.accessToken;

      if (token && !skipAuth) {
        headers.set("Authorization", `${token}`);
      }

      const res = await fetch(url, { ...restOptions, headers });

      if (res.status === 401 && !skipAuth) {
        // Token might be expired, try to refresh
        const newSession = await getSession();

        if (newSession?.user.tokens.accessToken) {
          headers.set("Authorization", `${newSession.user.tokens.accessToken}`);
          // Retry the request
          return fetch(url, { ...restOptions, headers });
        }
      }

      return res;
    },
    [session]
  );

  return {
    fetchClient,
    isAuthenticated: status === "authenticated",
  };
}
