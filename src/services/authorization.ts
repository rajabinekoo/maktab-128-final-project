import { NextRequest } from "next/server";
import { getUserInfo } from "./users.service";

export const authorization = async (request: NextRequest) => {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s/, "");
  if (!token) return;
  return await getUserInfo(token);
};
