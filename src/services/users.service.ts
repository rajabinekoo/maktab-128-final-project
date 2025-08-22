import { database } from "./database";
import { signinSchemaType, signupSchemaType } from "@/validations/auth";
import {
  updateProfileSchemaType,
  changePasswordServerSchemaType,
} from "@/validations/user";

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

export const updateUserNameAndAvatar = async (
  userId: string,
  data: updateProfileSchemaType
) => {
  const pb = await database.getPocketbaseClient();
  try {
    if (!data.name) delete data.name;
    if (!data.avatar) delete data.avatar;
    return Boolean(await pb.collection("users").update(userId, data));
  } catch {
    return undefined;
  }
};

export const updatePassword = async (
  userId: string,
  data: changePasswordServerSchemaType
) => {
  const pb = await database.getPocketbaseClient();
  try {
    return Boolean(
      await pb.collection("users").update(userId, {
        oldPassword: data.opassword,
        password: data.password,
        passwordConfirm: data.password,
      })
    );
  } catch {
    return undefined;
  }
};
