import { generateAxiosInstance } from "./client";
import { urls } from "./request-urls";

export const addAuthorRequest = async (data: IAddAuthor) => {
  const client = generateAxiosInstance();
  const newAuthor = await client.post(urls.auth.signup, data);
  return newAuthor;
};
