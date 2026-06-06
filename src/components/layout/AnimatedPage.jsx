import { motion } from 'framer-motion';
import SEO from '../ui/SEO';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

export default function AnimatedPage({ children, title, description, canonical }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SEO title={title} description={description} canonical={canonical} />
      {children}
    </motion.div>
  );
}
