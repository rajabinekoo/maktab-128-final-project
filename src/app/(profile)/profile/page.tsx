import { AuthGuard } from "@/providers/auth-guard.provider";
import Link from "next/link";

export default function Profile() {
  return (
    <AuthGuard>
      <div>
        <Link href="/editProfile">
          <button>Edit profile</button>
        </Link>
      </div>
      <div>
        <Link href="/newArticle">
          <button>New Article</button>
        </Link>
      </div>
    </AuthGuard>
  );
}
