import { z } from "zod";

export const PostSchema = z.object({
  authorId: z.string(),
  content: z.string().max(280),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  published: z.boolean().default(false),
});

export type PostSchemaZod = z.infer<typeof PostSchema>;
