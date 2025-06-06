import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Testimonial from "../Testimonial";

import user1 from "../../../assets/img/user-1.jpg";
import user2 from "../../../assets/img/user-2.jpg";
import user3 from "../../../assets/img/user-3.jpg";
import "./Slider.css";
const users = [
  {
    img: user1,
    name: "Nick Smith",
    location: "Toronto, Canada",
    text: "I was skeptical about this, but it turned out to be the best decision I've ever made.",
  },
  {
    img: user2,
    name: "Mary Thomas",
    location: "London, UK",
    text: "This is the best bank I've ever used. I don't know how I lived without it.",
  },
  {
    img: user3,
    name: "David Miller",
    location: "New York, USA",
    text: "I can't believe how easy it is to use this bank. It's the best thing since sliced bread.",
  },
];
const Slider: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    if (isButtonPressed) {
      setIsButtonPressed(false);
      return;
    }
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % users.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [active, isButtonPressed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActive((prev) => (prev - 1 + users.length) % users.length);
      }
      if (e.key === "ArrowRight") {
        setActive((prev) => (prev + 1) % users.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return (
    <div className='slider'>
      {users.map((user, index) => (
        <div key={index}>
          <AnimatePresence>
            <motion.div
              className='slide'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                scale: index === active ? 1 : [0, 1.1],
                opacity: index === active ? 1 : 0,
              }}
              exit={{
                opacity: 0,
                scale: [1, 0.8, 0.5],
                transition: { ease: "easeInOut" },
              }}
              transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
            >
              <Testimonial {...user} />
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
      <button
        className='slider__btn slider__btn--left'
        onClick={() => {
          setActive((prev) => (prev - 1 + users.length) % users.length);
          setIsButtonPressed(true);
        }}
      >
        &#10094;
      </button>
      <button
        className='slider__btn slider__btn--right'
        onClick={() => {
          setActive((prev) => (prev + 1) % users.length);
          setIsButtonPressed(true);
        }}
      >
        &#10095;
      </button>
      <div className='dots'>
        {users.map((_, index) => (
          <span
            key={index}
            className={`dots__dot ${
              index === active ? "dots__dot--active" : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
