import { motion } from "framer-motion";
import React from "react";
import "./Section.css";

// interface ImageProps {
//   lazy: string;
//   src: string;
//   alt: string;
// }

// interface TestimonialProps {
//   img: string;
//   name: string;
//   location: string;
//   text: string;
// }

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}
const SectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Section: React.FC<SectionProps> = ({
  id,
  title,
  description,
  children,
}) => {
  return (
    <motion.section
      variants={SectionVariants}
      initial='hidden'
      animate='visible'
      className='section'
      id={id}
    >
      <div className='section__title'>
        <h2 className='section__description'>{title}</h2>
        <h3 className='section__header'>{description}</h3>
      </div>

      {children}
    </motion.section>
  );
};

export default Section;
