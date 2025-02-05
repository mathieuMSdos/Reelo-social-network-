// auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { userSchema } from "./lib/schema/user.schema";
import { userNameGenerator } from "./lib/utils/scriptJS/usernameGenerator";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      try {
        if (user) {
          // ZOD validation typage pour USER
          const validatedUser = userSchema.parse(user);

          token.id = validatedUser.id;
          token.email = validatedUser.email;
          token.name = validatedUser.name;
          token.picture = validatedUser.image;
          token.hasCompletedOnboarding = validatedUser.hasCompletedOnboarding;
          token.followedByCount = validatedUser.followedByCount;
          token.followingCount = validatedUser.followingCount;
        }

        if (!token.id) {
          return token;
        }

        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string,
          },
          select: {
            username: true,
            displayName: true,
            image: true,
            email: true,
            name: true,
            hasCompletedOnboarding: true,
            followedByCount: true,
            followingCount: true,
          },
        });

        if (dbUser) {
          const updatedToken = {
            ...token,
            username: dbUser.username ?? null,
            displayName: dbUser.displayName ?? null,
            email: dbUser.email ?? token.email ?? null,
            name: dbUser.name ?? token.name ?? null,
            picture: dbUser.image ?? token.picture ?? null,
            hasCompletedOnboarding:
              dbUser.hasCompletedOnboarding ??
              token.hasCompletedOnboarding ??
              null,
            followedByCount: dbUser.followedByCount ?? 0,
            followingCount: dbUser.followingCount ?? 0,
          };
          return updatedToken;
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    session: async ({ session, token }) => {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: typeof token.id === "string" ? token.id : undefined,
          username: token.username ?? null,
          displayName: token.displayName ?? null,
          email: token.email ?? null,
          name: token.name ?? null,
          image: token.picture ?? null,
          hasCompletedOnboarding: token.hasCompletedOnboarding ?? null,
          followedByCount: token.followedByCount ?? 0,
          followingCount: token.followingCount ?? 0,
        },
      };

      return updatedSession;
    },

    // Ajout de la gestion de redirection ok
    redirect({ baseUrl }) {
      return `${baseUrl}/protected/onboardingPage`;
    },

    // Ajout de la gestion des autorisations
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHomePage = nextUrl.pathname.startsWith("/protected/home");
      const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");

      if (isAuthRoute) return true;

      if (isOnHomePage && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },

  pages: {
    // défini le chemin vers la page de connexion
    signIn: "/",
  },
  session: { strategy: "jwt" },
  events: {
    createUser: async (user) => {
      try {
        let generatedUsername = await userNameGenerator(
          user.user.name ?? "user"
        );

        let isExistingUserName = await prisma.user.findUnique({
          where: {
            username: generatedUsername,
          },
        });

        while (isExistingUserName) {
          generatedUsername = await userNameGenerator(user.user.name ?? "user");
          isExistingUserName = await prisma.user.findUnique({
            where: {
              username: generatedUsername,
            },
          });
        }

        await prisma.user.update({
          where: {
            id: user.user.id,
          },
          data: {
            username: generatedUsername,
          },
        });
        // Ne rien retourner ici
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
      }
    },
  },
});
