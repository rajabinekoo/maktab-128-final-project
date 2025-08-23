import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { backendMessages } from "@/utils/messages";
import { authorization } from "@/services/authorization";
import { addNewArticle, findArticleByTitle } from "@/services/article.service";
import { newArticleSchema, newArticleSchemaType } from "@/validations/article";

export async function POST(request: NextRequest) {
  try {
    const user = await authorization(request);
    if (!user) {
      return Response.json(
        { message: backendMessages.authorizationFailed },
        { status: 401 }
      );
    }
    const formdata = await request.formData();
    const fields: newArticleSchemaType = {
      thumbnail: formdata.get("thumbnail") as File,
      title: (formdata.get("title") as string)?.trim?.()?.toLowerCase?.(),
      description: (formdata.get("description") as string)
        ?.trim?.()
        ?.toLowerCase?.(),
    };
    newArticleSchema.parse(fields);
    const duplication = await findArticleByTitle(fields.title);
    if (!!duplication)
      return Response.json(
        { message: backendMessages.articleDuplication },
        { status: 409 }
      );
    await addNewArticle(
      user.record.id,
      fields,
      formdata.get("body") as File,
      formdata.get("thumbnail") as File
    );
    return Response.json({ message: "created" }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });
    console.log(error);
    return Response.json(
      { message: backendMessages.internalServerError },
      { status: 500 }
    );
  }
}
