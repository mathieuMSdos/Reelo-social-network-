import { z } from "zod"

// Schéma de base pour User
export const UserSchema = z.object({
  id: z.string().optional(), // Optionnel car pas présent à la création
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable(), // Retiré la validation URL car Google peut envoyer null
  createdAt: z.date().optional(), // Optionnel car géré par Prisma
  updatedAt: z.date().optional() // Optionnel car géré par Prisma
})

// Schéma pour la session
export const SessionSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    image: z.string().nullable() // Retiré la validation URL
  }),
  expires: z.string().or(z.date()) // Ajout du champ expires
})

// Type inféré du schéma
export type SessionZod = z.infer<typeof SessionSchema>
export type UserZod = z.infer<typeof UserSchema>