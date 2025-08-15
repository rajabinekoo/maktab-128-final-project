import { pb } from "./pocketbase.client";

export const addAuthor = async (data: IAddAuthor) => {
  return pb.collection("authors").create(data);
};

export const findAuthorByEmail = async (email: string) => {
  try {
    return pb.collection("authors").getFirstListItem(`email = "${email}"`);
  } catch (error) {
    return undefined;
  }
};
