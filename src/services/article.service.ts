import { database } from "./database";
import { newArticleSchemaType } from "@/validations/article";

export const addNewArticle = async (
  userId: string,
  data: newArticleSchemaType,
  body: File,
  thumbnail: File
) => {
  const pb = await database.getPocketbaseClient();
  await pb
    .collection("_superusers")
    .authWithPassword(
      process.env.POCKERBASE_ADMIN_USERNAME as string,
      process.env.POCKERBASE_ADMIN_PASSWORD as string
    );
  return pb.collection("articles").create({
    body,
    userId,
    thumbnail,
    title: data.title,
    description: data.description,
  });
};

export const findArticleByTitle = async (title: string) => {
  const pb = await database.getPocketbaseClient();
  try {
    return await pb
      .collection("articles")
      .getFirstListItem(`title = "${title}"`);
  } catch {
    return undefined;
  }
};

export const findArticleById = async (id: string) => {
  const pb = await database.getPocketbaseClient();
  await pb
    .collection("_superusers")
    .authWithPassword(
      process.env.POCKERBASE_ADMIN_USERNAME as string,
      process.env.POCKERBASE_ADMIN_PASSWORD as string
    );
  try {
    return await pb.collection("articles").getFirstListItem(`id = "${id}"`);
  } catch {
    return undefined;
  }
};

type getArticlesList = (
  _?: IPagination,
  _2?: boolean
) => Promise<IListResponse<IArticle>>;
export const getArticlesList: getArticlesList = async (
  params,
  onlyPublicArticles = true
) => {
  const page = Number(params?.page || 1);
  const perPage = Number(params?.perPage || 12);
  const pb = await database.getPocketbaseClient();
  await pb
    .collection("_superusers")
    .authWithPassword(
      process.env.POCKERBASE_ADMIN_USERNAME as string,
      process.env.POCKERBASE_ADMIN_PASSWORD as string
    );
  try {
    return await pb.collection("articles").getList(page, perPage, {
      filter: onlyPublicArticles ? `publish = true` : "",
    });
  } catch {
    return { items: [], page: 0, perPage: 0, totalItems: 0, totalPages: 0 };
  }
};

export const setArticlePublishStatus = async (
  articleId: string,
  publish: boolean
) => {
  const pb = await database.getPocketbaseClient();
  try {
    return Boolean(
      await pb.collection("articles").update(articleId, { publish })
    );
  } catch {
    return false;
  }
};
