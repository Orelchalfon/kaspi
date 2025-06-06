import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

interface HeaderProps {
  logo: string;
  onClickOpenAccount: () => void;
}

const regularNavVariants = {
  visible: {
    y: [-20, 0],
    opacity: 1,
  },
};
const stickyNavVariants = {
  visible: {
    y: [-100, 0],
    opacity: [0, 1],
  },
};
const listVariants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: { delay: 0.5, when: "beforeChildren", staggerChildren: 0.05 },
  },
};
const listItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Header: React.FC<HeaderProps> = ({ logo, onClickOpenAccount }) => {
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    if (latestScrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });


  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='header'
    >
      <motion.nav
        className={`nav ${isSticky && "sticky"}`}
        variants={isSticky ? stickyNavVariants : regularNavVariants}
        animate='visible'
        exit='exit'
        transition={{ duration: 0.5, type: "tween" }}
      >
        <motion.img
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          src={logo}
          alt='Bankist logo'
          className='nav__logo'
          id='logo'
          data-version-number='3.0'
        />
        <motion.ul
          initial='hidden'
          animate='visible'
          variants={listVariants}
          className='nav__links'
        >
          <motion.li variants={listItemVariants} className='nav__item'>
            <a className='nav__link' href='#section--1'>
              Features
            </a>
          </motion.li>
          <motion.li variants={listItemVariants} className='nav__item'>
            <a className='nav__link' href='#section--2'>
              Operations
            </a>
          </motion.li>
          <motion.li variants={listItemVariants} className='nav__item'>
            <a className='nav__link' href='#section--3'>
              Testimonials
            </a>
          </motion.li>
          <motion.li variants={listItemVariants} className='nav__item'>
            <button className='nav__link  btn' onClick={onClickOpenAccount}>
              <span className='btn--text'>Sign In</span>
            </button>
          </motion.li>
        </motion.ul>
      </motion.nav>

    </motion.header>
  );
};

export default Header;
