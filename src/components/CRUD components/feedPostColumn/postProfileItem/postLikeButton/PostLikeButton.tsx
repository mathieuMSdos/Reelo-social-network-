"use client";

import { likePostAction } from "@/app/actions/socialActions/likePost/likePost.action";
import { unlikePostAction } from "@/app/actions/socialActions/likePost/unLikePost.action";
import { useStore } from "@/lib/store/index.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

interface PostLikeButtonProps {
  authorId: string;
  idPost: string;
  likeCount: number;
  likedBy: { id: string }[];
  userAlreadyLikeThisPost: boolean;
}

const PostLikeButton = ({
  authorId,
  idPost,
  likeCount,
  likedBy,
  userAlreadyLikeThisPost,
}: PostLikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const userId = useStore((state) => state.userId);
  const queryClient = useQueryClient();

  const { mutate: likeMutation } = useMutation({
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
                    likedBy: [...(post.likedBy || []), { id: userId }],
                    userAlreadyLikeThisPost: true,
                  }
                : post
            ),
          })),
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
        exact: true,
      });
    },
  });

  const { mutate: unlikeMutation } = useMutation({
    // Fonction qui effectue la mutation côté serveur
    mutationFn: () => unlikePostAction(userId, idPost, authorId),

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
                    likeCount: post.likeCount - 1,
                    likedBy: (post.likedBy || []).filter(
                      (like) => like.id !== userId
                    ),
                    userAlreadyLikeThisPost: false,
                  }
                : post
            ),
          })),
        };
      });

      return { previousData };
    },
    onSuccess: async () => {
      console.log("unlike réussi");
    },

    // En cas d'erreur, on revient à l'état précédent
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts", authorId], context?.previousData);
    },

    // Une fois la mutation terminée (succès ou échec), on rafraîchit les données
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", authorId],
        exact: true,
      });
    },
  });

  const handleClickLikeButton = () => {
    if (authorId === userId) {
      // si userid est l'auteur du post on l'empêche de liker (en front ici mais dans le server action il y a une protection aussi)
      return;
    }
    // modifier le state pour lancer l'animation
    if (!isAnimating) {
      setIsAnimating(true);
    }

    if (!userAlreadyLikeThisPost) {
      // si l'utilisateur n'a  jamais liké le post on joue la mutation like
      likeMutation();
    } else {
      // sinon c'est la fonction unlike on joue la mutation unlike
      unlikeMutation();
    }
  };

  return (
    <button
      className="flex gap-1 items-center justify-center"
      onClick={() => handleClickLikeButton()}
    >
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 0.5, 1.5, 1],
                transition: {
                  duration: 0.3,
                  onComplete: () => setIsAnimating(false),
                },
              }
            : {}
        }
      >
        <Heart
          className={`${
            userAlreadyLikeThisPost ? "text-purpleBtn" : "text-textGrey"
          }  transition-all duration-100 `}
          fill="currentColor"
          size={20}
        />
      </motion.div>

      <p
        className={`${
          userAlreadyLikeThisPost ? "text-purpleBtn" : "text-textGrey"
        } font-bold transition-all duration-100
`}
      >
        {likeCount}
      </p>
    </button>
  );
};

export default PostLikeButton;
