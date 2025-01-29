import { prisma } from "@/prisma";

export const isUserExist = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId},
    });

    if (user) {
      return {
        message: "User exist",
        data: {
          isUserExist: true,
        },
      };
    } else {
      return {
        message: "user dont exist",
        data: {
          data: {
            isUserExist: false,
          },
        },
      };
    }
  } catch (error) {
    return {
      message: "checking user failed",
      data: {
        error: error,
      },
    };
  }
};
