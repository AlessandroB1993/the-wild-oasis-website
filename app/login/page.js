import SignInButton from "../_components/SignInButton";
import { signInAction } from "../_lib/actions";
import { providers } from "../_lib/auth";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <form action={signInAction}>
      <div className="mt-10 flex flex-col items-center gap-10">
        <h2 className="text-3xl font-semibold">
          Sign in to access your guest area
        </h2>

        {providers.map((provider) => (
          <SignInButton key={provider.id} provider={provider.name} />
        ))}
      </div>
    </form>
  );
}
