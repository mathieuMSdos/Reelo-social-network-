"use server";

import { checkExistingFollow } from "@/lib/utils/validation/following/checkExistingFollow";
import { checkUsersExist } from "@/lib/utils/validation/following/checkUsersExist";

export const checkFollowAction = async (
  userID: string,
  userFollowedID: string
) => {
  try {
    const usersCheck = await checkUsersExist(userID, userFollowedID);
    if (usersCheck?.data.existingUsers) {
      return await checkExistingFollow(userID, userFollowedID);
    }
  } catch (error) {
    return {
      success: false,
      message: "check actual follow relation failed",
      error: error,
      data: null,
    };
  }
};
