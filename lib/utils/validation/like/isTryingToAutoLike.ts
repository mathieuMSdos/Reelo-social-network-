export const isTryingToAutoLike = async (userId, authorId) => {
  if (userId !== authorId) {
    return {
      message: "user don't tying to auto like post",
      data: {isTryingToAutoLike: false,}
    };
  } else {
    return {
      message: "user tying to auto like post",
      data: {isTryingToAutoLike: true,}
    };
  }
};
