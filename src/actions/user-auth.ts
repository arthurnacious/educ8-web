"use server";

import { api_url } from "@/lib/config";
import { User } from "next-auth";

interface iUser extends User {
  expiresIn: number;
}

interface SessionPayload {
  user: iUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
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

  // ✅ Get headers from the response
  const tokens = {
    accessToken: response.headers.get("Authorization") as string,
    refreshToken: response.headers.get("X-Refresh-Token") as string,
  };

  const data: { user: iUser } = await response.json(); // Parse JSON response

  const payload = { ...data, tokens };
  return payload;
};

export const getRefreshToken = async (
  refreshToken: string
): Promise<SessionPayload> => {
  try {
    // console.log("getting refresh token", refreshToken);
    const response: Response = await fetch(`${api_url}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const tokens = {
      accessToken: response.headers.get("Authorization") as string,
      refreshToken: response.headers.get("X-Refresh-Token") as string,
    };

    const data: { user: iUser } = await response.json();

    const payload = { ...data, tokens };
    return payload;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
