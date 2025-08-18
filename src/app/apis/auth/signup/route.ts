import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { signupServerSchema, signupSchemaType } from "@/validations/auth";
import { findUserByEmail, loginByCrendentials } from "@/services/users.service";
import { backendMessages } from "@/utils/messages";

export async function POST(request: NextRequest) {
  try {
    const body: signupSchemaType = await request.json();
    signupServerSchema.parse(body);
    body.email = body.email.toLowerCase();
    const duplicateAuthor = await findUserByEmail(body.email);
    if (!!duplicateAuthor)
      return Response.json(
        { message: backendMessages.userDuplication },
        { status: 409 }
      );
    const session = await loginByCrendentials(body);
    if (!session)
      return Response.json(
        { message: backendMessages.internalServerError },
        { status: 500 }
      );
    return Response.json(session, { status: 200 });
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
