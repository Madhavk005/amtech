import { motion } from 'framer-motion';
import { stagger, viewport } from '../../utils/animations';
import styles from './SectionHeader.module.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionHeader({
  label,
  title,
  description,
  subtitle, // backward compat alias for description
  align = 'center',
  light = false,
  className = '',
  ...props
}) {
  const desc = description || subtitle;

  const classes = [
    styles.header,
    styles[align],
    light ? styles.light : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Determine if title is a string (support HTML highlights) or JSX */
  const isStringTitle = typeof title === 'string';

  return (
    <motion.div
      className={classes}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...props}
    >
      {label && (
        <motion.span className={styles.label} variants={itemVariants}>
          <span className={styles.dot} aria-hidden="true" />
          {label}
        </motion.span>
      )}

      {isStringTitle ? (
        <motion.h2
          className={styles.title}
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <motion.h2 className={styles.title} variants={itemVariants}>
          {title}
        </motion.h2>
      )}

      {desc && (
        <motion.p className={styles.description} variants={itemVariants}>
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}
