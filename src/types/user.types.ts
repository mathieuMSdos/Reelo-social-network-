
// src/types/user.types.ts

export interface UserType {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  username: string | null;
  displayName: string;
  hasCompletedOnboarding: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  posts?: Post[];
  accounts?: Account[];
  sessions?: Session[];
  Authenticator?: Authenticator[];
  followedBy?: User[];
  following?: User[];
  followedByCount: number;
  followingCount: number;
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
