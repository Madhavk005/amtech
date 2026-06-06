import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, ArrowUpRight, Shield, Settings, AlertTriangle } from 'lucide-react';
import { stats, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { fadeUp, fadeLeft, fadeRight, stagger, viewport } from '../utils/animations';
import styles from './Manufacturing.module.css';

const pillars = [
  {
    title: 'Production Excellence',
    subtitle: 'Scale & Precision',
    desc: 'Our massive 50,000+ sq.m. facility features large fabrication areas, dedicated sub-assembly centers, and a heavy machine shop equipped to handle projects of any scale.',
    path: '/manufacturing/production',
    image: images.factory1,
  },
  {
    title: 'Design Advantage',
    subtitle: 'Engineered for Performance',
    desc: 'With an in-house design department utilizing the latest 2D and 3D software, we engineer customised cranes strictly complying with IS Standards.',
    path: '/manufacturing/design-advantage',
    image: images.design1,
  },
  {
    title: 'Automation & CNC',
    subtitle: 'Next-Generation Manufacturing',
    desc: 'We leverage state-of-the-art CNC machine centers and proprietary software to achieve unparalleled dimensional accuracy and surface finish quality.',
    path: '/manufacturing/automation-computerisation',
    image: images.cnc1,
  }
];

const qualityPoints = [
  'Rigorous in-process and final inspection protocols',
  'Load testing and performance verification on every crane',
  'Full compliance with IS standards and industry regulations',
  'Documented quality records and traceability',
];

const safetyEnhancers = [
  {
    title: 'Overload Protection',
    desc: 'Advanced load monitoring to prevent lifting beyond rated capacities, ensuring structural integrity.',
    icon: Shield,
  },
  {
    title: 'Anti-Collision Devices',
    desc: 'Precision sensors to prevent crane-to-crane and crane-to-structure collisions in shared runways.',
    icon: Settings,
  },
  {
    title: 'Emergency Stop Mechanisms',
    desc: 'Instantly responsive emergency controls for immediate halt during critical situations.',
    icon: AlertTriangle,
  },
  {
    title: 'Advanced Limit Switches',
    desc: 'Rotary and cross-bar limit switches to prevent over-hoisting, over-lowering, and over-travel.',
    icon: CheckCircle,
  }
];

export default function Manufacturing() {
  return (
    <main className={styles.page}>
      <SEO title="Manufacturing | Amtech Cranes" description="State-of-the-art manufacturing capabilities delivering world-class crane systems from our 50,000+ sq.m. facility." />
      
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
              <span>Manufacturing</span>
            </nav>
            <h1 className={styles.heroTitle}>Where Precision<br/>Meets Scale.</h1>
            <p className={styles.heroSubtitle}>
              Our state-of-the-art facility integrates advanced robotics, heavy-duty fabrication, and proprietary design systems to engineer the finest industrial cranes in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── The Three Pillars (Alternating Full Width) ─── */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.pillarsList}>
            {pillars.map((pillar, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`${styles.pillarRow} ${isEven ? styles.layoutNormal : styles.layoutReverse}`}>
                  <motion.div 
                    className={styles.pillarVisual}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.7 }}
                  >
                    <img src={pillar.image} alt={pillar.title} className={styles.pillarImg} loading="lazy" />
                  </motion.div>
                  
                  <motion.div 
                    className={styles.pillarContent}
                    variants={isEven ? fadeLeft : fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    <span className={styles.pillarBadge}>{pillar.subtitle}</span>
                    <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                    <p className={styles.pillarDesc}>{pillar.desc}</p>
                    <Link to={pillar.path} className={styles.pillarAction}>
                      Explore {pillar.title.split(' ')[0]} <ArrowUpRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Quality Section (Clean Split) ─── */}
      <section className={styles.qualitySection}>
        <div className={styles.container}>
          <div className={styles.qualityGrid}>
            <motion.div className={styles.qualityText} variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
              <SectionHeader
                label="Quality Assurance"
                title="Uncompromising Standards."
                align="left"
              />
              <p className={styles.qualityDesc}>
                Quality is at the heart of everything we do. From raw material sourcing to final dispatch, every crane undergoes rigorous inspection and testing. Our manufacturing processes strictly comply with IS standards.
              </p>
              <ul className={styles.qualityList}>
                {qualityPoints.map((point, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} className={styles.qualityCheck} strokeWidth={2.5} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div className={styles.qualityVisual} variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport}>
              <div className={styles.qualityImageWrap}>
                 <img src={images.factory2} alt="Quality Inspection" className={styles.qualityImg} loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Safety Enhancers ─── */}
      <section className={styles.safetySection}>
        <div className={styles.container}>
          <SectionHeader
            label="Safety Enhancers"
            title="Engineered for Operator Safety."
            align="center"
          />
          <motion.div 
            className={styles.safetyGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {safetyEnhancers.map((item, idx) => (
              <motion.div key={idx} className={styles.safetyCard} variants={fadeUp}>
                <div className={styles.safetyIconWrap}>
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.safetyTitle}>{item.title}</h3>
                <p className={styles.safetyDesc}>{item.desc}</p>
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
            <h2 className={styles.ctaTitle}>Ready to Build Your Next Crane?</h2>
            <p className={styles.ctaText}>
              Partner with Amtech for world-class manufacturing backed by 35+ years of expertise.
            </p>
            <div className={styles.ctaActions}>
              <Button variant="primary" to="/contact" size="lg" arrow>Contact Us</Button>
              <Button variant="outline" to="/products" size="lg">View Portfolio</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
