import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { signinServerSchema, signinSchemaType } from "@/validations/auth";
import { findUserByEmail, loginByCrendentials } from "@/services/users.service";

export async function POST(request: NextRequest) {
  try {
    const body: signinSchemaType = await request.json();
    signinServerSchema.parse(body);
    body.email = body.email.toLowerCase();
    const duplicateAuthor = await findUserByEmail(body.email);
    if (!duplicateAuthor)
      return Response.json({ message: "Not found" }, { status: 404 });
    return Response.json(await loginByCrendentials(body), { status: 200 });
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
