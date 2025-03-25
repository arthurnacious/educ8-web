import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified?: boolean;
    role: string;
    permissions: string[];
    tokens: {
      expiresIn: number;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
