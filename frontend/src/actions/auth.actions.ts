"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  SigninFormValues,
  signinSchema,
  SignupFormValues,
  signupSchema,
} from "@/lib/validations";
import { apiRequest } from "@/lib/apiRequest";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function signupAction(formData: SignupFormValues) {
  try {
    const validatedFields = signupSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid fields",
      };
    }

    const { username, email, password } = validatedFields.data;

    const data = await apiRequest("/api/auth/local/register", "POST", {
      username,
      email,
      password,
    });

    if (data.jwt) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.jwt, cookieOptions);
      // redirect("/dashboard");
    }

    if (data.error) {
      return {
        success: false,
        message: data.error.message ?? "Something went wrong",
        error: data.error,
      };
    }

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      error,
    };
  }
}

export async function signinAction(formData: SigninFormValues) {
  try {
    const validatedFields = signinSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid fields",
      };
    }

    const { identifier, password } = validatedFields.data;

    const data = await apiRequest("/api/auth/local", "POST", {
      identifier,
      password,
    });

    if (data.jwt) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.jwt, cookieOptions);
      // redirect("/dashboard");
    }

    if (data.error) {
      return {
        success: false,
        message: data.error.message ?? "Something went wrong",
        error: data.error,
      };
    }

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      error,
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/signin");
}
