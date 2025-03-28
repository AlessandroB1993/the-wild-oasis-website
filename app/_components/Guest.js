import Link from "next/link";
import { auth } from "../_lib/auth";

async function Guest() {
  const session = await auth();

  return (
    <li>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="flex items-center gap-4 transition-colors hover:text-accent-400"
        >
          <img
            className="h-8 rounded-full"
            src={session?.user?.image}
            alt={session?.user?.name}
            referrerPolicy="no-referrer"
          />
          <span>Guest area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="transition-colors hover:text-accent-400"
        >
          Guest area
        </Link>
      )}
    </li>
  );
}

export default Guest;
