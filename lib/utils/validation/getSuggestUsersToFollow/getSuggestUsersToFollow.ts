import { prisma } from "@/prisma";

// Type pour la réponse de la fonction
interface GetSuggestUsersToFollowResponse {
  success: boolean;
  data?: {
    id: string;
    username: string | null;
    displayName: string;
    image: string | null;
    alreadyFollowed: boolean; // Ajout de cette propriété
  }[];
  error?: string;
}

/**
 * Récupère 3 suggestions d'utilisateurs à suivre pour un utilisateur donné
 * Les suggestions sont basées sur l'activité (nombre de posts) des utilisateurs
 * et exclut les utilisateurs déjà suivis

 */
export async function getSuggestUsersToFollow(
  userId: string
): Promise<GetSuggestUsersToFollowResponse> {
  try {
    // Récupération de l'utilisateur et de ses follows
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: {
          select: { id: true }
        }
      }
    });

    if (!currentUser) {
      return {
        success: false,
        error: "User not found"
      };
    }

    // Création d'un tableau des IDs des utilisateurs déjà suivis
    const followingIds = currentUser.following.map(user => user.id);
    followingIds.push(userId); // Ajout de l'ID de l'utilisateur lui-même

    // Récupération des utilisateurs les plus actifs non suivis
    const suggestedUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: followingIds
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        image: true,
        _count: {
          select: {
            posts: true
          }
        }
      },
      take: 3
    });

    // Formatage de la réponse avec alreadyFollowed toujours à false
    const formattedUsers = suggestedUsers.map(user => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      image: user.image,
      alreadyFollowed: false // Comme ce sont des suggestions, c'est toujours false
    }));

    return {
      success: true,
      data: formattedUsers
    };

  } catch (error) {
    console.error("Error in getSuggestUsersToFollow:", error);
    return {
      success: false,
      error: "Failed to fetch user suggestions"
    };
  }
}
