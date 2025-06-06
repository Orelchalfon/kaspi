import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./PageReveal.module.scss";
type PageRevealProps = {
  children: ReactNode;
  className?: string;
};
const PageReveal = ({ children, className, ...props }: PageRevealProps) => {
  const classes= [styles["page-reveal"], className].join(" ");
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export default PageReveal;
