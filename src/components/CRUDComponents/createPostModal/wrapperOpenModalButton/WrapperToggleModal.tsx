"use client";
import { useStore } from "@/lib/store/index.store";
import React from "react";

interface WrapperOpenModalProps {
  children: React.ReactElement<{
    onClick?: () => void;
    className?: string;
    text?: string;
    children?: React.ReactNode;
  }>;
}
const WrapperToggleModal = ({ children }: WrapperOpenModalProps) => {
  const setIsCreatePostModalOpen = useStore(
    (state) => state.setIsCreatePostModalOpen
  );

  return React.cloneElement(children, {
    onClick: () => setIsCreatePostModalOpen(true),
  });
};

export default WrapperToggleModal;
