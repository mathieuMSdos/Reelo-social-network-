import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";
import { UserType } from "./src/types/user.types";

declare module 'next-auth' {
  interface Session {
    user: UserType;
  }
}

export async function middleware(request: NextRequest) {
  // Récupère la session de l'utilisateur (via le token JWT)
  const session = await auth();
  
  // Étape 1: Vérification de base - Utilisateur non connecté essayant d'accéder aux routes protégées
  // Si pas de session (non connecté) ET tente d'accéder à une route /protected/*
  // → Redirection vers la page d'accueil
  if (!session && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Étape 2: Gestion des utilisateurs connectés
  if (session?.user) {
    console.log(session.user)
    // Récupère le statut d'hasCompletedOnboarding depuis la session utilisateur
    const hasCompletedOnboarding = session.user.hasCompletedOnboarding;
    
    // Cas 1: Utilisateur n'a PAS complété l'onboarding
    // ET n'est PAS déjà sur la page d'onboarding
    // → Redirection forcée vers la page d'onboarding
    if (!hasCompletedOnboarding && !request.nextUrl.pathname.startsWith('/protected/onboardingPage')) {
      return NextResponse.redirect(new URL("/protected/onboardingPage", request.url));
    }

    // Cas 2: Utilisateur a DÉJÀ complété l'onboarding
    // ET essaie d'accéder à la page d'onboarding
    // → Redirection vers la home (empêche de refaire l'onboarding)
    if (hasCompletedOnboarding && request.nextUrl.pathname.startsWith('/protected/onboardingPage')) {
      return NextResponse.redirect(new URL("/protected/home", request.url));
    }
  }

  // Si aucune condition de redirection n'est remplie
  // → Permet à la requête de continuer normalement
  return NextResponse.next();
}

// Configuration du middleware
// Spécifie que ce middleware ne s'applique qu'aux routes
// commençant par /protected/
// Le * signifie "toutes les routes après /protected/"
export const config = {
  matcher: [
    '/protected/:path*',
  ],
};