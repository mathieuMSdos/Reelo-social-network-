"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const SectionProductImage = () => {
  const { scrollYProgress } = useScroll();

  // L'image se déplacera plus lentement que le scroll
  const yPos = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-20%"] // L'image se déplacera de 50% de sa hauteur pendant le scroll
  );

  return (
    <div className="min-h-screen">
      {/* Section avec l'image en parallax */}
      <div className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: yPos }}>
          <Image
            className="object-cover"
            src="/assetLp/reello_asset_dashboard.webp"
            alt="dashboard"
            fill
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionProductImage;
