import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "../lib/prisma"
import { SessionSchema, UserSchema } from '../lib/validations/auth.schema';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Validation de la session
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
        try {
          return SessionSchema.parse(session)
        } catch (error) {
          console.error('Session validation error:', error)
          return session
        }
      }
      return session
    },
    // Validation lors de la création du JWT
    jwt: async ({ token, user }) => {
      if (user) {
        try {
          UserSchema.parse(user)
        } catch (error) {
          console.error('User validation error:', error)
        }
      }
      return token
    },
    // Validation des données du profil
    signIn: async ({ user }) => {
      if (user) {
        try {
          UserSchema.partial().parse(user)
          return true
        } catch (error) {
          console.error('SignIn validation error:', error)
          return false // Refuse la connexion si les données sont invalides
        }
      }
      return false
    }
  },
}