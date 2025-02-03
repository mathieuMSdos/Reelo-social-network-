"use server";

import { getSuggestUsersToFollow } from "@/lib/utils/validation/getSuggestUsersToFollow/getSuggestUsersToFollow";

export const suggestUsersAction = async (userId: string) => {
  try {
    const result = await getSuggestUsersToFollow(userId);
    
    if (!result.success) {
      throw new Error(result.error || "Failed to fetch suggestions");
    }

    return {
      suggestions: result.data,
    };
    
  } catch (error) {
    console.error("Error in suggestUsersAction:", error);
    throw new Error("Failed to fetch user suggestions");
  }
};