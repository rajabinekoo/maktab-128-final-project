import { NextRequest } from "next/server";

import { backendMessages } from "@/utils/messages";
import { authorization } from "@/services/authorization";
import {
  findArticleById,
  setArticlePublishStatus,
} from "@/services/article.service";
import { revalidateTag } from "next/cache";

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const user = await authorization(request);
    if (!user) {
      return Response.json(
        { message: backendMessages.authorizationFailed },
        { status: 401 }
      );
    }
    const article = (await findArticleById(id)) as unknown as IArticle;
    if (!article || article.userId !== user.record.id)
      return Response.json(
        { message: backendMessages.articleNotFound },
        { status: 404 }
      );
    const updated = await setArticlePublishStatus(article.id, !article.publish);
    if (!updated)
      return Response.json(
        { message: backendMessages.internalServerError },
        { status: 500 }
      );
    revalidateTag("public-articles");
    return Response.json({ message: "updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: backendMessages.internalServerError },
      { status: 500 }
    );
  }
}
