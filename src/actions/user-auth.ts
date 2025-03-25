"use server";

import { api_url } from "@/lib/config";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

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
    accessToken: response.headers.get("Authorization"),
    refreshToken: response.headers.get("X-Refresh-Token"),
  };

  const data = await response.json(); // Parse JSON response

  return { ...data, tokens };
};

export const getRefreshToken = async (refreshToken: string): Promise<JWT> => {
  try {
    console.log("gettting refresh token");
    const response = await fetch(`${api_url}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const accessToken = response.headers.get("Authorization");
    const newRefreshToken = response.headers.get("X-Refresh-Token");

    const data = await response.json();

    const payload = { ...data, accessToken, refreshToken: newRefreshToken };
    // console.log(payload);
    return payload;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
