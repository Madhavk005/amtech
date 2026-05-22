import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { viewport } from '../../utils/animations';
import styles from './StatsCounter.module.css';

/* ---- Parse "3,500+" into { numericPart, prefix, suffix, hasCommas } ---- */
function parseValue(val) {
  const str = String(val);
  const match = str.match(/[\d,]+\.?\d*/);
  if (!match) return { numericPart: 0, prefix: str, suffix: '', hasCommas: false };

  const numericStr = match[0];
  const numericPart = parseFloat(numericStr.replace(/,/g, ''));
  const idx = match.index;
  const prefix = str.slice(0, idx);
  const suffix = str.slice(idx + numericStr.length);
  const hasCommas = numericStr.includes(',');

  return { numericPart, prefix, suffix, hasCommas };
}

function formatNumber(num, hasCommas) {
  if (!hasCommas) return String(Math.round(num));
  return Math.round(num).toLocaleString('en-IN');
}

function CountUpNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');
  const { numericPart, prefix, suffix, hasCommas } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numericPart, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(formatNumber(latest, hasCommas));
      },
    });

    return () => controls.stop();
  }, [isInView, numericPart, hasCommas]);

  return (
    <span ref={ref} className={styles.value}>
      {prefix}
      {isInView ? display : '0'}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function StatsCounter({
  stats = [],
  variant = 'dark',
  className = '',
}) {
  if (!stats.length) return null;

  const classes = [styles.section, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {stats.map((stat, idx) => (
          <motion.div className={styles.item} key={idx} variants={itemVariants}>
            <CountUpNumber value={stat.value} />
            <span className={styles.label}>{stat.label}</span>

            {/* Vertical divider (not on last item) */}
            {idx < stats.length - 1 && (
              <span className={styles.divider} aria-hidden="true" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
