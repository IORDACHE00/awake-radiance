import { TLogin, TRegister } from "@/schema/auth";
import { TUser } from "@/schema/user";

const BASE_API_URL = import.meta.env.VITE_APP_BASE_URL;

export async function register(credentials: TRegister) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const response = await fetch(`${BASE_API_URL}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during registration. Please try again later."
    );
  }

  const result = await response.json();

  return result;
}

export async function login(credentials: TLogin) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during login. Please try again later."
    );
  }

  const result = await response.json();

  return result.success;
}

export async function getMe(): Promise<TUser> {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/auth/me`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during fetching user information. Please try again later."
    );
  }

  const result = await response.json();

  return result.data.user;
}

export async function logout() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const response = await fetch(`${BASE_API_URL}/auth/logout`, {
    method: "POST",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();

    if (error.message) {
      throw new Error(error.message);
    }

    throw new Error(
      "Server returned an error during logout. Please try again later."
    );
  }

  return response.ok;
}
