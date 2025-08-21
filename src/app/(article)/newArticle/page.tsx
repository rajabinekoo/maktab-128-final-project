import { AuthGuard } from "@/providers/auth-guard.provider";

export default function NewArticlePage() {
  return (
    <main className="container mx-auto px-3">
      <p>ایجاد مقاله</p>
      <AuthGuard>
        <p>test</p>
      </AuthGuard>
    </main>
  );
}
