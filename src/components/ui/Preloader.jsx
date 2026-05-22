import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '../../data/siteData';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.content}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className={styles.logoWrapper}
            >
              <img src={company.logo} alt="Amtech Logo" className={styles.logo} />
              <div className={styles.glow} />
            </motion.div>

            <div className={styles.loadingBarContainer}>
              <div className={styles.loadingText}>
                <span>Initializing Systems</span>
                <span>{progress}%</span>
              </div>
              <div className={styles.track}>
                <motion.div 
                  className={styles.progress} 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

            <div className={styles.technicalData}>
              <span>LAT: 30.7333° N</span>
              <span>LONG: 76.7794° E</span>
              <span>SYSTEM: ONLINE</span>
            </div>
          </div>
          
          <div className={styles.gridOverlay} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
