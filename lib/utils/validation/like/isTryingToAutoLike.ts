export const isTryingToAutoLike = async (userId: string, authorId: string) => {
  if (userId !== authorId) {
    return {
      message: "user don't trying to auto like post",
      data: { isTryingToAutoLike: false },
    };
  } else {
    return {
      message: "user tying to auto like post",
      data: { isTryingToAutoLike: true },
    };
  }
};
