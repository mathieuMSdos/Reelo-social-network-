import { createContext } from "react";

export type QueryKeyType = [string, string];

export const QueryKeyOfFeedContext = createContext<QueryKeyType>(["", ""]);
