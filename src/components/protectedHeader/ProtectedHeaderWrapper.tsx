"use client";
import { useStore } from "@/lib/store/index.store";
import ProtectedHeader from "./ProtectedHeader";

const ProtectedHeaderWrapper = () => {
  const username = useStore((state) => state.username);
  const displayName = useStore((state) => state.displayName);
  const profilImage = useStore((state) => state.image);

  return (
    <>
      <ProtectedHeader
        username={username}
        displayName={displayName}
        profilImage={profilImage}
      />
    </>
  );
};

export default ProtectedHeaderWrapper;
