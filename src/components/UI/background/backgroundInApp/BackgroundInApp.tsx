import Image from "next/image";
import DotGrid from "../../../../../src/assets/Background/Dot_grid.svg";
import styles from "./backgroundInApp.module.css";

const BackgroundInApp = () => {
  return (
    <div className="fixed -z-20 pointer-events-none inset-0 w-full h-full bg-backgrounfLight">
      <div className={styles.gradientContainer}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
        <div className={styles.gradient4}></div>
      </div>
      <Image
        src={DotGrid}
        className="absolute bottom-0 object-contain opacity-50"
        priority
        alt="dot_texture"
      />
    </div>
  );
};

export default BackgroundInApp;
