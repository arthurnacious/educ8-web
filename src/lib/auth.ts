import { login, getRefreshToken } from "@/actions/user-auth";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import { JWT } from "next-auth/jwt";
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
          // Make sure credentials exist before accessing properties
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const res = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          // Check if res has the expected structure
          if (!res || !res.user || !res.accessToken) {
            console.error("Invalid response structure:", res);
            return null;
          }
          const { user: dbUser, accessToken } = res;

          console.log("Successfully logged in:", res);

          // Create a properly typed user object
          const user: User = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
            role: dbUser.role?.name || "User",
            accessToken: accessToken,
          };

          console.log("Authorized user:", user);
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.exp = Math.floor(Date.now() / 1000) + 60; // 1 minute from now,
      }

      const payload =
        token.exp && Date.now() < token.exp * 1000
          ? token
          : await refreshAccessToken(token);

      return payload;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await getRefreshToken();

    // if (!res || !res.user || !res.accessToken) {
    //   console.error("Invalid response structure:", res);
    //   return redirect("/login");
    // }

    const { user: dbUser, accessToken } = res;

    // Update token with fresh data
    return {
      ...token,
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role?.name || "User",
      accessToken: accessToken,
      exp: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
