"use server";
import { prisma } from "@/prisma";

export const searchUserDropDownMenu = async (searchQuery: string) => {
  const limit = 10;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { startsWith: searchQuery, mode: "insensitive" } },
          { displayName: { startsWith: searchQuery, mode: "insensitive" } },
        ],
      },
      select:{
        id: true,
        username: true, 
        displayName: true,
        image: true,
        name: true,
        followedByCount: true,
        followingCount: true,
        createdAt: true,
        updatedAt: true
      },
      take: limit,
    });

    return users;

  } catch (error) {
    console.log(error);
    return []
  }
};
