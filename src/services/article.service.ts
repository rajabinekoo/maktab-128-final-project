import { newArticleSchemaType } from "@/validations/article";
import { database } from "./database";

export const addNewArticle = async (data: newArticleSchemaType, body: File) => {
  const pb = await database.getPocketbaseClient();
  await pb
    .collection("_superusers")
    .authWithPassword(
      process.env.POCKERBASE_ADMIN_USERNAME as string,
      process.env.POCKERBASE_ADMIN_PASSWORD as string
    );
  return pb.collection("articles").create({
    body,
    title: data.title,
    description: data.description,
  });
};
