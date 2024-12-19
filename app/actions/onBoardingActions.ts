"use server";

import { prisma } from "@/prisma";

interface isExistObject {
  isExist: boolean,
  username: string | false
}

export const isUsernameAlreadyExist = async (userToFind: string):Promise<isExistObject> => {

 const isExist = await prisma.user.findUnique({
    where: { username: userToFind },
  });

  return {
    isExist: isExist != null,
    username: isExist?.username ? isExist?.username : false ,
  }

};
