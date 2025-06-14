"use client"
import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({
  text,
  spinDuration = 15,
  onHover = "speedUp",
  className = "",
  width = 300,
  height = 300,
  textColor = "#ffffff",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  // Calculate the radius based on the width and height
  const radius = Math.min(width, height) / 2;
  const fontSize = Math.min(width, height) / 10;

  if (!isMounted) {
    return (
      <div
        style={{
          width,
          height,
          position: 'relative',
          visibility: 'hidden'
        }}
      />
    );
  }

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ 
        rotate: rotation,
        width: width,
        height: height,
        position: 'relative'
      }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const angle = (rotationDeg * Math.PI) / 180;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const transform = `translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`;

        return (
          <span
            key={i}
            className="absolute inline-block transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ 
              transform,
              WebkitTransform: transform,
              fontSize: `${fontSize}px`,
              left: '50%',
              top: '50%',
              transformOrigin: '0 0',
              color: textColor
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
