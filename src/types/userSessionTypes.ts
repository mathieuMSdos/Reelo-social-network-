export interface UserSession  {
  id: string | null;
  username: string | null;
  displayName: string | null;
  email: string | null;
  name: string | null;
  image: string | null;
  hasCompletedOnboarding: boolean | null;
  followedByCount: number;
  followingCount: number;
}