import { getArticlesList } from "@/services/article.service";
import { ArticlesList } from "@/components/organisms/articles-list";
import { AuthGuard } from "@/providers/auth-guard.provider";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

async function fetchArticles(page: number) {
  "use cache";
  cacheTag("public-articles");
  return await getArticlesList({ page });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const articles = await fetchArticles(Number((await searchParams)?.page || 1));

  return (
    <AuthGuard restrict={false}>
      <main className="mx-auto container px-3 py-10">
        <ArticlesList list={articles} />
      </main>
    </AuthGuard>
  );
}
