import { database } from "./database";
import { signinSchemaType, signupSchemaType } from "@/validations/auth";

export const addUser = async (data: signupSchemaType) => {
  const pb = await database.getPocketbaseClient();
  return pb.collection("users").create({
    email: data.email,
    emailVisibility: true,
    password: data.password,
    passwordConfirm: data.password,
  });
};

export const findUserByEmail = async (email: string) => {
  const pb = await database.getPocketbaseClient();
  try {
    return await pb.collection("users").getFirstListItem(`email = "${email}"`);
  } catch {
    return undefined;
  }
};

export const loginByCrendentials = async (data: signinSchemaType) => {
  const pb = await database.getPocketbaseClient();
  try {
    return await pb
      .collection("users")
      .authWithPassword(data.email, data.password);
  } catch {
    return undefined;
  }
};

export const getUserInfo = async (token: string) => {
  const pb = await database.getPocketbaseClient();
  try {
    pb.authStore.save(token, null);
    return await pb.collection("users").authRefresh();
  } catch {
    return undefined;
  }
};
