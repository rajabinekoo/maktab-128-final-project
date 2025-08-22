import { AuthGuard } from "@/providers/auth-guard.provider";
import { getArticlesList } from "@/services/article.service";
import { ArticlesList } from "@/components/organisms/articles-list";

export const dynamic = "force-dynamic";

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const articles = await getArticlesList(
    {
      page: Number((await searchParams)?.page || 1),
    },
    false
  );

  console.log(articles);

  return (
    <AuthGuard>
      <main className="mx-auto container px-3 py-10">
        <ArticlesList profileMode={true} list={articles} />
      </main>
    </AuthGuard>
  );
}
