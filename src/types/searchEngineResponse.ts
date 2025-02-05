export type SearchEngineResponse = {
  alreadyFollowed: boolean;
  username: string | null;
  displayName: string;
  image: string | null;
  followedBy: undefined;
  followedByCount: number;
  followingCount: number;
  id: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}[];

export type SearchEngineError = {
  data: unknown;
};