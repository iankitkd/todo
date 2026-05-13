import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),

  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
