import React from 'react';
import styles from './ImageMarquee.module.css';
import { images } from '../../data/siteData';

const marqueeImages = [
  images.design1,
  images.production1,
  images.factoryCrane,
  images.factory5,
  images.design3,
  images.marquee1,
  images.marquee2,
  images.marquee3,
  images.marquee4,
  images.marquee5,
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
