"use client";

import { likePostAction } from "@/app/actions/socialActions/likePost.action";
import { useStore } from "@/lib/store/index.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface PostLikeButtonProps {
  authorId: string;
  idPost: string;
  likeCount: number;
  likedBy: { id: string }[];
}

const PostLikeButton = ({ authorId, idPost, likeCount, likedBy }: PostLikeButtonProps) => {
  const userId = useStore((state) => state.userId);
  const queryClient = useQueryClient();
  const hasLiked = likedBy?.some(like => like.id === userId);

  const { mutate: likeMutation, isPending } = useMutation({
    // Fonction qui effectue la mutation côté serveur
    mutationFn: () => likePostAction(userId, idPost, authorId),

    // Gestion de l'optimistic update
    onMutate: async () => {
      // Annuler les potentielles requêtes déjà en cours 
      await queryClient.cancelQueries({ queryKey: ["posts", authorId] });

      // Sauvegarder l'état précédent pour pouvoir revenir en arrière en cas d'erreur
      const previousData = queryClient.getQueryData(["posts", authorId]);

      // Mettre à jour le cache de manière optimiste
      queryClient.setQueryData(["posts", authorId], (oldData: any) => {
        if (!oldData?.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: any) => 
              post.id === idPost
                ? {
                    ...post,
                    likeCount: post.likeCount + 1,
                    likedBy: [...(post.likedBy || []), { id: userId }]
                  }
                : post
            )
          }))
        };
      });

      return { previousData };
    },

    // En cas d'erreur, on revient à l'état précédent
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts", authorId], context?.previousData);
    },

    // Une fois la mutation terminée (succès ou échec), on rafraîchit les données
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", authorId],
        exact: true
      });
    }
  });

  return (
    <button
      className="flex gap-1 items-center justify-center"
      onClick={() => userId && !hasLiked && likeMutation()}
      disabled={hasLiked || isPending}
    >
      <Heart
        className={`${hasLiked ? 'text-red-500' : 'text-textGrey'}`}
        fill="currentColor"
        size={20}
      />
      <p className="text-textGrey font-bold">{likeCount}</p>
    </button>
  );
};

export default PostLikeButton;