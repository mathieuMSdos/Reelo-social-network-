"use server";

import { PostSchema, PostSchemaZod } from "@/lib/schema/post.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createPost = async (data: PostSchemaZod) => {
  try {
    const validateData = PostSchema.parse(data);

    await prisma.post.create({
      data: {
        authorId: validateData.authorId,
        content: validateData.content,
        image: validateData.image,
        published: validateData.published,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { succes: false, error: error.errors };
    }
    return { succes: false, data: "Une erreur est survenue" };
  }
};
