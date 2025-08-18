import { NextRequest } from "next/server";
import { backendMessages } from "@/utils/messages";
import { getUserInfo } from "@/services/users.service";

// Get user info
export async function GET(request: NextRequest) {
  try {
    const token = request.headers
      .get("Authorization")
      ?.replace(/^Bearer\s/, "");
    if (!token) {
      return Response.json(
        { error: backendMessages.authorizationFailed },
        { status: 401 }
      );
    }
    const user = await getUserInfo(token);
    if (!user) {
      return Response.json(
        { error: backendMessages.authorizationFailed },
        { status: 401 }
      );
    }
    return Response.json(user.record);
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: backendMessages.internalServerError },
      { status: 500 }
    );
  }
}
