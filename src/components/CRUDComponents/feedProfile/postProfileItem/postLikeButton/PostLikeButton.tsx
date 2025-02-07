"use client";

import { likePostAction } from "@/app/actions/socialActions/likePost/likePost.action";
import { unlikePostAction } from "@/app/actions/socialActions/likePost/unLikePost.action";
import { useStore } from "@/lib/store/index.store";
import { QueryKeyOfFeedContext } from "@/src/contexts/QueryKeyOfFeedContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useContext, useState } from "react";

interface PostLikeButtonProps {
  authorId: string;
  idPost: string;
  likeCount: number;
  likedBy?: { id: string }[];
  userAlreadyLikeThisPost: boolean;
}

interface QueryData {
  pages: Array<{
    posts: Array<{
      id: string;
      likeCount: number;
      likedBy: Array<{ id: string }>;
      userAlreadyLikeThisPost: boolean;
    }>;
  }>;
}

const PostLikeButton = ({
  authorId,
  idPost,
  likeCount,
  userAlreadyLikeThisPost,
}: PostLikeButtonProps) => {
  // STate local

  const [isAnimating, setIsAnimating] = useState(false);
  // ZUSTAND
  const userId = useStore((state) => state.userId);

  // context react
  const queryKeyContext = useContext(QueryKeyOfFeedContext);

  // TANSTAK initiatialisation du queryclient
  const queryClient = useQueryClient();
  const { mutate: likeMutation } = useMutation({
    // Fonction qui effectue la mutation côté serveur
    mutationFn: () => likePostAction(userId ?? "", idPost, authorId),

    // Gestion de l'optimistic update
    onMutate: async () => {
      // Annuler les potentielles requêtes déjà en cours
      await queryClient.cancelQueries({ queryKey: queryKeyContext });

      // Sauvegarder l'état précédent pour pouvoir revenir en arrière en cas d'erreur
      const previousData = queryClient.getQueryData(queryKeyContext);

      // Mettre à jour le cache de manière optimiste
      queryClient.setQueryData(queryKeyContext, (oldData: QueryData) => {
        if (!oldData?.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
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
    onSuccess: (response) => {
      console.log(response);
    },

    // En cas d'erreur, on revient à l'état précédent
    onError: (error, __, context) => {
      console.log(error);
      queryClient.setQueryData(queryKeyContext, context?.previousData);
    },
  });

  const { mutate: unlikeMutation } = useMutation({
    // Fonction qui effectue la mutation côté serveur
    mutationFn: () => unlikePostAction(userId ?? "", idPost),

    // Gestion de l'optimistic update
    onMutate: async () => {
      // Annuler les potentielles requêtes déjà en cours
      await queryClient.cancelQueries({ queryKey: queryKeyContext });

      // Sauvegarder l'état précédent pour pouvoir revenir en arrière en cas d'erreur
      const previousData = queryClient.getQueryData(queryKeyContext);

      // Mettre à jour le cache de manière optimiste
      queryClient.setQueryData(queryKeyContext, (oldData: QueryData) => {
        if (!oldData?.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
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
    onSuccess: async (response) => {
      console.log(response);
    },

    // En cas d'erreur, on revient à l'état précédent
    onError: (error, __, context) => {
      console.log(error);
      queryClient.setQueryData(queryKeyContext, context?.previousData);
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
      disabled={authorId === userId}
      onClick={() => handleClickLikeButton()}
    >
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 0.5, 1.5, 1],
                transition: {
                  duration: 0.2,
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
