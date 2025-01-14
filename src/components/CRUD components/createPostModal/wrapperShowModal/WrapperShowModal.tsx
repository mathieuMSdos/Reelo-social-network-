"use client";
import { useStore } from "@/lib/store/index.store";
import CreatePostModal from "../CreatePostModal";

const WrapperShowModal = () => {
  const isCreatePostModalOpen = useStore(
    (state) => state.isCreatePostModalOpen
  );
  console.log(isCreatePostModalOpen)
  return <>{isCreatePostModalOpen && <CreatePostModal />} </>;
};

export default WrapperShowModal;
