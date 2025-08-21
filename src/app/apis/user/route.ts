import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { backendMessages } from "@/utils/messages";
import { authorization } from "@/services/authorization";
import { updateUserNameAndAvatar } from "@/services/users.service";
import {
  updateProfileSchema,
  updateProfileSchemaType,
} from "@/validations/user";

// Get user info
export async function GET(request: NextRequest) {
  try {
    const user = await authorization(request);
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

export async function PUT(request: NextRequest) {
  try {
    const user = await authorization(request);
    if (!user) {
      return Response.json(
        { error: backendMessages.authorizationFailed },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const data: updateProfileSchemaType = {
      avatar: formData.get("avatar") as File,
      name: formData.get("name") as string,
    };
    updateProfileSchema.parse(data);
    await updateUserNameAndAvatar(user.record.id, data)
    return Response.json({ message: "ok" });
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });
    console.log(error);
    return Response.json(
      { message: backendMessages.internalServerError },
      { status: 500 }
    );
  }
}
