import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { industries, stats } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  stagger,
  viewport,
} from '../utils/animations';
import styles from './Industries.module.css';

export default function Industries() {
  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">Industries</span>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Industries</span>
          </nav>
          <h1 className={styles.heroTitle}>
            Powering India's<br />Core Industries
          </h1>
          <p className={styles.heroSubtitle}>
            Specialized crane solutions engineered for the unique demands of
            steel, power, paper, and heavy manufacturing sectors.
          </p>
        </motion.div>
      </section>

      {/* ─── Industries Showcase ─── */}
      <section className={styles.industriesSection}>
        <div className={styles.container}>
          {industries.map((industry, idx) => {
            const isOdd = idx % 2 === 0;
            return (
              <div key={industry.id}>
                <motion.div
                  className={`${styles.industryBlock} ${isOdd ? styles.industryOdd : styles.industryEven}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  {/* Image */}
                  <motion.div
                    className={styles.industryImageWrap}
                    variants={isOdd ? slideInLeft : slideInRight}
                  >
                    <div className={styles.industryImageInner}>
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className={styles.industryImage}
                        loading="lazy"
                      />
                      <span className={styles.industryAccent} aria-hidden="true" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className={styles.industryContent}
                    variants={fadeUp}
                  >
                    <span className={styles.industryNum} aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.industryName}>{industry.name}</h3>
                    <p className={styles.industryDesc}>{industry.desc}</p>

                    <div className={styles.applicationTags}>
                      {industry.applications.map((app) => (
                        <span key={app} className={styles.tag}>
                          {app}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      to="/contact"
                      size="md"
                      arrow
                    >
                      Explore Solutions
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Divider between sections */}
                {idx < industries.length - 1 && (
                  <div className={styles.divider} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Stats ─── */}
      <StatsCounter stats={stats} variant="dark" />

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <motion.div
          className={styles.ctaInner}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2 className={styles.ctaTitle}>
            Let's Discuss Your Requirements
          </h2>
          <p className={styles.ctaText}>
            Every industry has unique challenges. Tell us about yours and
            we will engineer the right solution.
          </p>
          <Button variant="primary" to="/contact" size="lg" arrow>
            Get in Touch
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
