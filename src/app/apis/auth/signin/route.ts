import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { backendMessages } from "@/utils/messages";
import { signinServerSchema, signinSchemaType } from "@/validations/auth";
import { findUserByEmail, loginByCrendentials } from "@/services/users.service";

export async function POST(request: NextRequest) {
  try {
    const body: signinSchemaType = await request.json();
    signinServerSchema.parse(body);
    body.email = body.email.toLowerCase();
    const duplicateAuthor = await findUserByEmail(body.email);
    if (!duplicateAuthor)
      return Response.json(
        { message: backendMessages.userNotFound },
        { status: 404 }
      );
    const session = await loginByCrendentials(body);
    if (!session)
      return Response.json(
        { message: backendMessages.userNotFound },
        { status: 404 }
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
