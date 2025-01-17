import { z } from "zod";

// Schema pour post un post

export const PostSchema = z.object({
  authorId: z.string(),
  content: z.string().max(280),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  published: z.boolean().default(false),
});

export type PostSchemaZod = z.infer<typeof PostSchema>;

// Schéma pour getPost extend du schema initial

export const GetPostSchemaExtend = PostSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// schema pour la réponse useInifinite

export const GetPostSchemaArray = z.array(GetPostSchemaExtend)

