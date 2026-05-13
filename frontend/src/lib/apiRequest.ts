import { getToken } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function apiRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>,
  options: RequestInit = {},
) {
  const token = await getToken();

  const url = `${API_URL}${endpoint}`;
  const fetchOptions: RequestInit = {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  const res = await fetch(url, fetchOptions);
  return res.json();
}
