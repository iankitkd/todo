export default function SigninPage() {
  return (
    <form className="w-full max-w-md bg-card p-8 rounded-2xl border border-border space-y-5">
      <h1 className="text-3xl font-bold text-foreground text-center">
        Sign In
      </h1>

      <input
        name="identifier"
        placeholder="Email or Username"
        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
      />

      <button className="w-full bg-foreground text-background py-3 rounded-lg cursor-pointer">
        Sign In
      </button>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
