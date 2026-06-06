import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle, Factory, Zap, FileText, HardHat, Car, Building, Train, Package } from 'lucide-react';
import { industries, stats } from '../data/siteData';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { fadeUp, stagger, viewport } from '../utils/animations';
import styles from './Industries.module.css';

const iconMap = {
  Factory,
  Zap,
  FileText,
  HardHat,
  Car,
  Building,
  Train,
  Package
};

export default function Industries() {
  return (
    <main className={styles.page}>
      <SEO title="Application By Industry | Amtech Cranes" description="Powering India's Core Industries with specialized crane solutions." />
      
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
              <span className={styles.breadcrumbSep}>/</span>
              <span>Application By Industry</span>
            </nav>
            <h1 className={styles.heroTitle}>Powering Core Industries</h1>
            <p className={styles.heroSubtitle}>
              Specialized crane solutions engineered for the unique demands of steel, power, paper, and heavy manufacturing sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Horizontal Alternating Rows ─── */}
      <section className={styles.listSection}>
        <div className={styles.container}>
          {industries.map((industry, idx) => {
            const IconComponent = iconMap[industry.icon];
            const isReversed = idx % 2 !== 0;

            return (
              <motion.div 
                key={industry.id} 
                className={`${styles.industryRow} ${isReversed ? styles.rowReversed : ''}`} 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Visual Side */}
                <div className={styles.rowVisual}>
                  <img src={industry.image} alt={industry.name} className={styles.rowImage} loading="lazy" />
                </div>
                
                {/* Content Side */}
                <div className={styles.rowContent}>
                  <div className={styles.rowHeader}>
                    <div className={styles.rowIconWrap}>
                      {IconComponent && <IconComponent size={32} strokeWidth={1.5} />}
                    </div>
                    <h2 className={styles.rowTitle}>{industry.name}</h2>
                  </div>
                  
                  <p className={styles.rowDesc}>{industry.desc}</p>
                  
                  <div className={styles.applicationsList}>
                    <span className={styles.appLabel}>Key Applications</span>
                    <ul className={styles.appItems}>
                      {industry.applications.map(app => (
                        <li key={app}>
                          <CheckCircle size={16} className={styles.appIcon} strokeWidth={2} />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.rowFooter}>
                    <div className={styles.clientTrust}>
                      <span className={styles.trustedByText}>Trusted By</span>
                      <div className={styles.clientLogoWrap}>
                        <img src={industry.clientLogo} alt="Client Logo" className={styles.clientLogoInline} />
                      </div>
                    </div>

                    <Button variant="outline" to="/contact" arrow>
                       Discuss Solutions
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
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
