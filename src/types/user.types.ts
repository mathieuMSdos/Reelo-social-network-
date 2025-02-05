// src/types/user.types.ts

// Import types from Prisma client
import { Post, Account, Session, Authenticator, User } from "@prisma/client";

export interface UserType {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  username: string | null;
  displayName: string;
  hasCompletedOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
  followedByCount: number;
  followingCount: number;
  
  // Relations (optional car ils peuvent ne pas être inclus dans les requêtes)
  posts?: Post[];
  accounts?: Account[];
  sessions?: Session[];
  Authenticator?: Authenticator[];
  followedBy?: User[];
  following?: User[];
  postLiked?: Post[];
}

export type UserPublicDataType = Pick<
  UserType,
  | "id"
  | "name"
  | "image"
  | "username"
  | "displayName"
  | "createdAt"
  | "posts"
  | "followedBy"
  | "following"
  | "followedByCount"
  | "followingCount"
>;