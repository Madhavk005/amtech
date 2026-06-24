import React from 'react';
import styles from './ImageMarquee.module.css';
import { images } from '../../data/siteData';

const marqueeImages = [
  images.hero1,
  images.design1,
  images.production1,
  images.factoryCrane,
  images.cnc1,
  images.eot1,
];

// Double the array to ensure smooth infinite scrolling
const scrollItems = [...marqueeImages, ...marqueeImages, ...marqueeImages];

export default function ImageMarquee() {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {scrollItems.map((src, idx) => (
          <div key={idx} className={styles.marqueeItem}>
            <img src={src} alt={`Amtech Crane Showcase ${idx}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
