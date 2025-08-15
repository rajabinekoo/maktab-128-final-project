import { addAuthor, findAuthorByEmail } from "@/services/authors.service";
import { pb } from "@/services/pocketbase.client";
import { signupServerSchema } from "@/validations/auth";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body: IAddAuthor = await request.json();
    signupServerSchema.parse(body);
    body.email = body.email.toLowerCase();
    // const duplicateAuthor = await findAuthorByEmail(body.email);
    // if (!!duplicateAuthor)
    //   return Response.json({ message: "Already signup" }, { status: 409 });
    return Response.json({ author: await addAuthor(body) }, { status: 201 });
  } catch (error) {
    console.log("error", error);
    if (error instanceof ZodError)
      return Response.json({ error }, { status: 400 });
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
