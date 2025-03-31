import { login, getRefreshToken } from "@/actions/user-auth";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (
            !res ||
            !res.user ||
            !res.tokens.accessToken ||
            !res.tokens.refreshToken
          ) {
            console.error("Invalid response structure:", res);
            return null;
          }

          console.log({ res });

          // Create a properly typed user object
          const auth: User = {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            image: res.user.image,
            role: res.user.role,
            permissions: res.user.permissions,
            tokens: {
              expiresIn: res.user.expiresIn,
              accessToken: res.tokens.accessToken,
              refreshToken: res.tokens.refreshToken,
            },
          };

          return auth;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.accessToken = user.tokens.accessToken;
        token.refreshToken = user.tokens.refreshToken;
        token.expiresAt = user.tokens.expiresIn;
        token.permissions = user.permissions;
        return token;
      }

      console.log("here 1");
      // Check if the token has expired
      const now = Math.floor(Date.now() / 1000);
      const tokenIsExpired = now >= token.expiresAt;
      if (!tokenIsExpired) {
        return token; // Token is still valid
      }

      console.log("here 2", now);

      // Token expired, refresh it
      try {
        console.log({ token });
        const response = await getRefreshToken(token.refreshToken as string);

        if (
          !response ||
          !response.tokens.accessToken ||
          !response.tokens.refreshToken
        ) {
          console.error("Failed to refresh token", response);
          throw new Error("Failed to refresh token");
        }

        // Update the token with new values
        token = {
          ...token,
          id: response.user.id as string,
          name: response.user.name,
          email: response.user.email,
          image: response.user.image,
          role: response.user.role,
          permissions: response.user.permissions,
          accessToken: response.tokens.accessToken,
          refreshToken: response.tokens.refreshToken,
          expiresAt: response.user.expiresIn,
        };

        return token;
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions;
        session.user.tokens = {
          expiresIn: token.expiresIn as number,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
