"use server";

import { api_url } from "@/lib/config";

interface User {
  id: string;
  user: string;
  name: string;
  email: string;
  emailVerified: string;
  roleId: string;
  image: string;
  role: { name: string };
}

interface SessionPayload {
  user: User;
  accessToken: string;
  //refreshToken is in the headers so js dont access it
}

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<SessionPayload> => {
  const response = await fetch(`${api_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.status === 401) {
    throw new Error("Failed to login");
  }

  if (!response.ok) {
    throw new Error("An error occurred while signing in");
  }

  return response.json();
};

export const getRefreshToken = async (): Promise<SessionPayload> => {
  const response = await fetch(`${api_url}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}), // just send nothing
  });

  if (response.status === 401) {
    throw new Error("Failed to login");
  }

  if (!response.ok) {
    throw new Error("An error occurred while signing in");
  }

  return response.json();
};
