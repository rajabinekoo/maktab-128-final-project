import { urls } from "./request-urls";
import { generateAxiosInstance } from "./client";

type newArticle = (_: FormData) => Promise<void>;
export const newArticle: newArticle = async (data) => {
  const client = generateAxiosInstance();
  await client.post(urls.article.create, data);
};

type changePublishStatus = (_: string) => Promise<void>;
export const changePublishStatus: changePublishStatus = async (articleId) => {
  const client = generateAxiosInstance();
  await client.patch(urls.article.publishToggle(articleId));
};
