import { motion } from "framer-motion";
import React from "react";
interface ImageProps {
  lazy: string;
  src: string;
  alt: string;
}
const imageVariants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.5 },
  },
};

const Feature: React.FC<ImageProps> = ({ lazy, src, alt }) => {
  return (
    <motion.img
      src={lazy}
      data-src={src}
      alt={alt}
      variants={imageVariants}
      initial='hidden'
      whileInView={'visible' }
      className='features__img'
    />
  );
};

export default Feature;
