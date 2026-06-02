import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, Monitor, Cpu } from 'lucide-react';
import { manufacturing, stats, company, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  stagger,
  viewport,
} from '../utils/animations';
import styles from './AutomationComputerisation.module.css';

const benefitVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const machineVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AutomationComputerisation() {
  const { automation } = manufacturing;

  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">
          Automation
        </span>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/manufacturing">Manufacturing</Link>
            <ChevronRight size={14} />
            <span>Automation &amp; Computerisation</span>
          </nav>
          <h1 className={styles.heroTitle}>
            Automation &amp;
            <br />
            Computerisation
          </h1>
          <p className={styles.heroSubtitle}>
            In-house high-class CNC machine centre and customised software enable
            high-quality and accurate crane production.
          </p>
        </motion.div>
      </section>

      {/* ─── CNC Overview ─── */}
      <section className={styles.cncOverview}>
        <div className={styles.container}>
          <div className={styles.cncGrid}>
            <motion.div
              className={styles.cncImageWrap}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <img
                src={images.cnc1}
                alt="CNC machine centre at Amtech"
                className={styles.cncImage}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className={styles.cncContent}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="CNC Capabilities"
                title="Precision-Driven Manufacturing"
                align="left"
              />
              <p className={styles.cncText}>{automation.desc}</p>
              <p className={styles.cncText}>
                Our CNC capabilities allow us to produce critical components like
                gearboxes, wheel assemblies, and drum assemblies entirely
                in-house, maintaining complete quality control over every part.
              </p>
            </motion.div>
          </div>

          {/* Benefit Cards */}
          <motion.div
            className={styles.benefitsRow}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {automation.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className={styles.benefitCard}
                variants={benefitVariant}
              >
                <CheckCircle
                  size={20}
                  strokeWidth={2}
                  className={styles.benefitIcon}
                />
                <span className={styles.benefitText}>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Machine Inventory ─── */}
      <section className={styles.machines}>
        <div className={styles.machinesBg}>
          <img
            src={images.cnc2}
            alt="CNC machine centre background"
            className={styles.machinesBgImg}
            loading="lazy"
          />
          <div className={styles.machinesBgOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.machinesHeaderWrap}>
            <SectionHeader
              label="Equipment Arsenal"
              title="State-of-the-Art Machinery"
              align="center"
              light
            />
          </div>
          <motion.div
            className={styles.machinesGrid}
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {automation.machines.map((machine, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const isLarge = idx === 0 || idx === 3 || idx === 7;
              return (
                <motion.div
                  key={idx}
                  className={`${styles.machineCard} ${isLarge ? styles.machineCardLarge : ''}`}
                  variants={machineVariant}
                >
                  <span className={styles.machineNum}>{num}</span>
                  <span className={styles.machineName}>{machine}</span>
                  <div className={styles.machineGlow} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Software Systems ─── */}
      <section className={styles.software}>
        <div className={styles.container}>
          <div className={styles.softwareGrid}>
            <motion.div
              className={styles.softwareContent}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="Software Systems"
                title="Computerised from Day One"
                align="left"
              />
              <p className={styles.softwareText}>{automation.softwareNote}</p>
              <p className={styles.softwareText}>
                From design and estimation to production planning and resource
                management, our computer-based systems ensure precision,
                traceability, and efficiency at every stage of the manufacturing
                process.
              </p>

              <div className={styles.softwareHighlights}>
                <div className={styles.softwareTag}>
                  <Cpu size={18} strokeWidth={2} />
                  <span>Computer systems since 1986</span>
                </div>
                <div className={styles.softwareTag}>
                  <Monitor size={18} strokeWidth={2} />
                  <span>SAP ERP implementation</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.softwareImageWrap}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <img
                src={images.cncSoftware}
                alt="Amtech software systems screenshot"
                className={styles.softwareImage}
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <StatsCounter stats={stats} variant="light" />

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
            Experience Precision Manufacturing
          </h2>
          <p className={styles.ctaText}>
            Our CNC-equipped, computer-integrated facility is ready to
            manufacture your next crane with unmatched accuracy and quality.
          </p>
          <div className={styles.ctaActions}>
            <Button variant="white" to="/manufacturing" size="lg" arrow>
              Back to Manufacturing
            </Button>
            <Button variant="primary" to="/contact" size="lg" arrow>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
