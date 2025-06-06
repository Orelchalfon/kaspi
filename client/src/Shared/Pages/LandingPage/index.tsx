import { motion } from "framer-motion";
import Lottie from "lottie-react";
import React, { lazy } from "react";
import cardLazy from "../../../assets/img/card-lazy.jpg";
import card from "../../../assets/img/card.jpg";
import digitalLazy from "../../../assets/img/digital-lazy.jpg";
import digital from "../../../assets/img/digital.jpg";
import growLazy from "../../../assets/img/grow-lazy.jpg";
import grow from "../../../assets/img/grow.jpg";
import hero from "../../../assets/img/hero.png";
import icon from "../../../assets/img/icon.png";
import DownArr from "../../../assets/LottieAnimations/DownArr.json";
import { PageVariants } from "../../Constants/Variants";
const Feature = lazy(() => import("../../Components/Feature"));
const Footer = lazy(() => import("../../Components/Footer"));
const Operations = lazy(() => import("../../Components/Operations"));
const Section = lazy(() => import("../../Components/Section"));
const Slider = lazy(() => import("../../Components/Slider"));

const images = [
  { lazy: cardLazy, src: card, alt: "Card" },
  { lazy: digitalLazy, src: digital, alt: "Digital" },
  { lazy: growLazy, src: grow, alt: "Grow" },
];

const LandingPage: React.FC = () => {
  return (
    <motion.div
      className='landing-page'
      variants={PageVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Section>
        <div className='header__title'>
          <h1>
            When <span className='highlight'>banking</span> meets
            <br />
            <span className='highlight'>minimalist</span>
          </h1>
          <h4>A simpler banking experience for a simpler life.</h4>
          <button className='btn--text btn--scroll-to'>
            <a className='nav__link' href='#section--1'>
              Learn more{" "}
              <Lottie animationData={DownArr} loop height={20} width={20} />
            </a>
          </button>
          <img src={hero} className='header__img' alt='Minimalist bank items' />
        </div>
      </Section>
      <Section
        id='section--1'
        title='Features'
        description='Everything you need in a modern bank and more.'
      >
        <div className='features'>
          {images.map((img, index) => (
            <Feature key={index} lazy={img.lazy} src={img.src} alt={img.alt} />
          ))}
        </div>
      </Section>
      <Section
        id='section--2'
        title='Operations'
        description='Everything as simple as possible, but no simpler.'
      >
        <Operations />
      </Section>

      <Section
        id='section--3'
        title='Testimonials'
        description='Millions of Bankists are already making their lives simpler.'
      >
        <Slider />
      </Section>
      <Footer icon={icon} />
    </motion.div>
  );
};

export default LandingPage;
