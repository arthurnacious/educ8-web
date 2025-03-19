import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
