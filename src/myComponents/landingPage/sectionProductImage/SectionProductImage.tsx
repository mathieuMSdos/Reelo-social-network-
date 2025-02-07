"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./SectionProductImage.module.css";

const SectionProductImage = () => {
  const { scrollYProgress } = useScroll();

  // Effet horizontal : de gauche à droite
  const xPos = useTransform(
    scrollYProgress,
    [0, 2],
    ["-10%", "0%"]
  );

  // Effet vertical : de haut en bas
  const yPos = useTransform(
    scrollYProgress,
    [0, 1],
    ["-30%", "5%"]
  );

  return (
    <div className="relative w-full">
      <div className="w-full h-[80vh] relative overflow-hidden md:h-screen">
        <motion.div 
          className="absolute inset-0 w-[120%]"
          style={{ 
            x: xPos,
            y: yPos,
          }}
        >
          <Image
            className="object-cover"
            src="/assetLp/reello_asset_dashboard.webp"
            alt="dashboard"
            fill
            sizes="100vw"
          />
          {/* div filtre  */}
          <div className={`absolute inset-0 w-[120%] ${styles.gradient}`}></div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionProductImage;