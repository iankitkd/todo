"use client";

import { signupAction } from "@/actions/auth.actions";
import { signupSchema, SignupFormValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    await signupAction(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-card p-8 rounded-2xl border border-border space-y-5"
    >
      <h1 className="text-3xl font-bold text-foreground text-center">
        Create Account
      </h1>

      {/* Username */}
      <div className="space-y-1">
        <input
          {...register("username")}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
        />

        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
        />

        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
        />

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-foreground text-background py-3 rounded-lg cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
