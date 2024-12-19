"use client";

import { Player } from "@lordicon/react";
import { useEffect, useRef } from "react";

interface GenericIconProps {
  iconName: string;
  size?: number;
  colorize?: string;
  loop?: boolean
}

const GenericIcon = ({ iconName, size, colorize,loop=false }:GenericIconProps) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <div>
      <Player
        ref={playerRef}
        icon={`../../../assets/icons/${iconName}`}
        size={size}
        colorize={colorize}
        onComplete={loop ? (() => playerRef.current?.playFromBeginning()): undefined} // pour jouer en boucle
      />
    </div>
  );
};

export default GenericIcon;
