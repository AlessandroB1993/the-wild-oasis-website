import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";
import { useAuthContext } from "./AuthContext";

function SignOutButton() {
  async function handleSignOut() {
    try {
      await signOutAction();
    } catch {
      console.error("Could not Sign out");
    }
  }

  return (
    <form action={handleSignOut}>
      <button className="flex w-full items-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
