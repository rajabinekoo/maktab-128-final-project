import { urls } from "./request-urls";
import { generateAxiosInstance } from "./client";
import { signinSchemaType, signupSchemaType } from "@/validations/auth";

type signup = (_: signupSchemaType) => Promise<ILoginResDto>;
export const signupUserRequest: signup = async (data) => {
  const client = generateAxiosInstance();
  const newAuthor = await client.post(urls.auth.signup, data);
  return newAuthor.data;
};

type signin = (_: signinSchemaType) => Promise<ILoginResDto>;
export const signinUserRequest: signin = async (data) => {
  const client = generateAxiosInstance();
  const newAuthor = await client.post(urls.auth.signin, data);
  return newAuthor.data;
};
