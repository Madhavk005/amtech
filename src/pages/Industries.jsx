import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';
import { industries, stats } from '../data/siteData';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { fadeUp, stagger, viewport } from '../utils/animations';
import styles from './Industries.module.css';

export default function Industries() {
  return (
    <main className={styles.page}>
      <SEO title="Industries | Amtech Cranes" description="Powering India's Core Industries with specialized crane solutions." />
      
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.container}>
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
            <h1 className={styles.heroTitle}>Powering Core Industries</h1>
            <p className={styles.heroSubtitle}>
              Specialized crane solutions engineered for the unique demands of steel, power, paper, and heavy manufacturing sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Premium Grid ─── */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.industryGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {industries.map((industry) => (
              <motion.div key={industry.id} className={styles.industryCard} variants={fadeUp}>
                <div className={styles.cardVisual}>
                  <img src={industry.image} alt={industry.name} className={styles.cardImage} loading="lazy" />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardTitleWrap}>
                    <h2 className={styles.cardTitle}>{industry.name}</h2>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardDesc}>{industry.desc}</p>
                  
                  <div className={styles.applicationsList}>
                    <span className={styles.appLabel}>Key Applications</span>
                    <ul className={styles.appItems}>
                      {industry.applications.map(app => (
                        <li key={app}>
                          <CheckCircle size={14} className={styles.appIcon} strokeWidth={2.5} />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.cardAction}>
                     <Link to="/contact" className={styles.actionLink}>
                       Discuss Solutions <ArrowRight size={16} />
                     </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <StatsCounter stats={stats} variant="light" />

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaInner}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className={styles.ctaTitle}>Let's Discuss Your Requirements</h2>
            <p className={styles.ctaText}>
              Every industry has unique challenges. Tell us about yours and we will engineer the right solution.
            </p>
            <Button variant="primary" to="/contact" size="lg" arrow>
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
