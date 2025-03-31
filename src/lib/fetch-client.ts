import { useSession } from "next-auth/react";
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

      if (session?.user.tokens.accessToken && !skipAuth) {
        console.log({ accessToken: session.user.tokens.accessToken });
        headers.set("Authorization", `${session.user.tokens.accessToken}`);
      }

      return await fetch(url, { ...restOptions, headers });
    },
    [session]
  );

  return {
    fetchClient,
    isAuthenticated: status === "authenticated",
  };
}
