import { signoutAction } from "@/actions/auth.actions";
import Link from "next/link";

export default function page() {
  return (
    <form
      action={signoutAction}
      className="w-full max-w-md bg-card p-8 rounded-2xl border border-border space-y-5"
    >
      <h1 className="text-xl font-bold text-foreground">
        Are you sure you want to signout?
      </h1>
      <div className="flex justify-between">
        <Link
          href={"/"}
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl cursor-pointer"
        >
          Go Back
        </Link>
        <button
          type="submit"
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-xl cursor-pointer"
        >
          Signout
        </button>
      </div>
    </form>
  );
}
