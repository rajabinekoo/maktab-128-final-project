import { urls } from "./request-urls";
import { generateAxiosInstance } from "./client";

type newArticle = (_: FormData) => Promise<void>;
export const newArticle: newArticle = async (data) => {
  const client = generateAxiosInstance();
  await client.post(urls.article.create, data);
};
