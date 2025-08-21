import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { backendMessages } from "@/utils/messages";
import { authorization } from "@/services/authorization";
import { addNewArticle } from "@/services/article.service";
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
      title: formdata.get("title") as string,
      description: formdata.get("description") as string,
    };
    newArticleSchema.parse(fields);
    await addNewArticle(fields, formdata.get("body") as File);
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
