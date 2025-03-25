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

          const {
            user: dbUser,
            tokens: { accessToken, refreshToken },
          } = res;

          // Create a properly typed user object
          const user: User = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            role: dbUser.role,
            permissions: dbUser.permissions,
            tokens: {
              expiresIn: dbUser.expiresIn,
              accessToken,
              refreshToken,
            },
            // Store refreshToken in the user object
          };

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If it's the first time logging in, store tokens
      if (user) {
        const { tokens } = user;
        token.id = user.id as string;
        token.role = user.role;
        token.accessToken = tokens.accessToken;
        token.refreshToken = tokens.refreshToken;
        token.exp = tokens.expiresIn; // Set expiry to 10 minutes from now
        return token;
      }

      // Check if the token has expired
      const tokenIsExpired = token.exp && Date.now() >= token.exp * 1000;
      if (!tokenIsExpired) {
        return token; // Token is still valid
      }

      // Token expired, refresh it
      try {
        console.log("i got here pops");
        const newTokens = await getRefreshToken(token.refreshToken as string);

        if (!newTokens || !newTokens.accessToken || !newTokens.refreshToken) {
          console.error("Failed to refresh token", newTokens);
          return { ...token, error: "RefreshAccessTokenError" };
        }

        // Update the token with new values
        return {
          ...token,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
          exp: Math.floor(Date.now() / 1000) + 60 * 10, // Extend expiry
        };
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
