import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { signupServerSchema, signupSchemaType } from "@/validations/auth";
import {
  addUser,
  findUserByEmail,
  loginByCrendentials,
} from "@/services/users.service";

export async function POST(request: NextRequest) {
  try {
    const body: signupSchemaType = await request.json();
    signupServerSchema.parse(body);
    body.email = body.email.toLowerCase();
    const duplicateAuthor = await findUserByEmail(body.email);
    if (!!duplicateAuthor)
      return Response.json({ message: "Already signup" }, { status: 409 });
    const user = await addUser(body);
    return Response.json(await loginByCrendentials(body), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
