export const checkSelfFollow = async (userID: string, userFollowedID: string) => {
  if (userID !== userFollowedID) {
    return {
      message: "Different users",
      data: { isSameUser: false },
    };
  } else {
    return {
      message: "You cannot follow yourself",
      data: { isSameUser: true },
    };
  }
};
