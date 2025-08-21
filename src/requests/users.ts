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

type userInfo = () => Promise<IUser>;
export const getUserInfo: userInfo = async () => {
  const client = generateAxiosInstance();
  const newAuthor = await client.get(urls.user.info);
  return newAuthor.data;
};

type updateProfile = (_: FormData) => Promise<void>;
export const updateProfile: updateProfile = async (data) => {
  const client = generateAxiosInstance();
  await client.put(urls.user.update, data);
};

type editPassword = (_: IChangePasswordDto) => Promise<void>;
export const editPassword: editPassword = async (data) => {
  const client = generateAxiosInstance();
  await client.patch(urls.user.changePassword, data);
};
