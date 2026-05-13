"use client";

import { signinAction } from "@/actions/auth.actions";
import { signinSchema, SigninFormValues } from "@/lib/validations";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    const res = await signinAction(data);
    if (res.success) {
      toast.success("Signed in successfully");
      router.push("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-card p-8 rounded-2xl border border-border space-y-5"
    >
      <h1 className="text-3xl font-bold text-foreground text-center">
        Welcome Back
      </h1>

      {/* Email / Username */}
      <div className="space-y-1">
        <input
          {...register("identifier")}
          placeholder="Email or Username"
          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
        />

        {errors.identifier && (
          <p className="text-sm text-red-500">{errors.identifier.message}</p>
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
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Create account
        </a>
      </p>
    </form>
  );
}
