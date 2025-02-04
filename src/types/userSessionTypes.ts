export interface UserSession  {
  id: string;
  username: string | null;
  displayName: string | null;
  email: string | null;
  name: string | null;
  image: string | null;
  hasCompletedOnboarding: boolean;
  followedByCount: number;
  followingCount: number;
}