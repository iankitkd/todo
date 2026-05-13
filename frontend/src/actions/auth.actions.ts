"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signinSchema, signupSchema } from "@/lib/validations";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function signupAction(formData: unknown) {
  try {
    const validatedFields = signupSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }

    const { username, email, password } = validatedFields.data;

    // Save user to DB
    console.log(username, email, password);

    const res = await fetch(`${API_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.jwt) {
      const cookieStore = await cookies();

      cookieStore.set("token", data.jwt, {
        httpOnly: true,
        secure: false,
        path: "/",
      });

      redirect("/dashboard");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signinAction(formData: unknown) {
  try {
    const validatedFields = signinSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
      };
    }

    const { identifier, password } = validatedFields.data;
    const isEmail = identifier.includes("@");

    console.log(identifier, password, isEmail);

    const res = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginWith: isEmail ? "email" : "username",
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (data.jwt) {
      const cookieStore = await cookies();

      cookieStore.set("token", data.jwt, {
        httpOnly: true,
        secure: false,
        path: "/",
      });

      redirect("/dashboard");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/signin");
}
