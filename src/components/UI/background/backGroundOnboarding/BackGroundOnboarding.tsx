// BackgroundOnboarding.js
"use client";
import { useEffect, useRef } from "react";
import styles from "./backGroundOnboarding.module.css";

const BackgroundOnboarding = () => {
  const interBubbleRef = useRef(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;

      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(
          curX
        )}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.gradientBg}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
      
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className={styles.gradientsContainer}>
          <div className={styles.g0} />
          <div className={styles.g1} />
          <div className={styles.g2} />
          <div className={styles.g3} />
          <div className={styles.g4} />
          <div className={styles.g5} />
          <div ref={interBubbleRef} className={styles.interactive} />
        </div>
      </div>
    </div>
  );
};

export default BackgroundOnboarding;
