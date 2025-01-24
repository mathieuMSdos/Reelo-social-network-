export const checkSelfFollow = async (userID: string, userFollowedID: string) => {
  if (userID !== userFollowedID) {
    return {
      success: true,
      message: "Different users",
      data: null,
    };
  } else {
    return {
      success: false,
      message: "You cannot follow yourself",
      data: null,
    };
  }
};
