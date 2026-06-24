import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { manufacturing, stats, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  stagger,
  viewport,
} from '../utils/animations';
import styles from './Production.module.css';

const qualityBullets = [
  'Complete assembly with actual cabins & cables',
  'Amtech Engineers inspection & verification',
  'Dedicated QA/QC division',
  'Pre-dispatch full testing',
];

const galleryImages = [
  { src: images.production1, alt: 'Heavy fabrication facility' },
  { src: images.production2, alt: 'Sub-assembly center' },
  { src: images.production3, alt: 'Crane assembly line' },
  { src: images.production4, alt: 'Quality inspection bay' },
];


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

const imageVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const bulletVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Production() {
  const { automation } = manufacturing;
  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">
          Production
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
            <span>Production</span>
          </nav>
          <h1 className={styles.heroTitle}>
            State-of-the-Art
            <br />
            Production Facility
          </h1>
          <p className={styles.heroSubtitle}>
            Our 2 Lac+ sq.ft. facility houses large fabrication centres,
            sub-assembly lines, and a heavy machine shop equipped with advanced
            CNC machines — everything under one roof for total quality control.
          </p>
        </motion.div>
      </section>

      {/* ─── Facility Overview ─── */}
      <section className={styles.facility}>
        <div className={styles.container}>
          <div className={styles.facilityGrid}>
            <motion.div
              className={styles.facilityImageWrap}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <img
                src={images.production1}
                alt="Amtech production facility interior"
                className={styles.facilityImage}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className={styles.facilityContent}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="Our Facility"
                title={manufacturing.facility}
                align="left"
              />
              <p className={styles.facilityText}>{manufacturing.overview}</p>
              <p className={styles.facilityText}>
                {manufacturing.production.desc}
              </p>

              <div className={styles.pillRow}>
                {['2 Lac+ Sq. Ft.', 'CNC Equipped', 'QA/QC Certified'].map(
                  (pill) => (
                    <span key={pill} className={styles.pill}>
                      {pill}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Production Capabilities — Gallery ─── */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          <SectionHeader
            label="Capabilities"
            title="Production Capabilities"
            align="center"
          />
          <motion.div
            className={styles.galleryGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                className={styles.galleryItem}
                variants={imageVariant}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.galleryImg}
                  loading="lazy"
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryCaption}>{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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


      {/* ─── Quality Assurance (dark) ─── */}
      <section className={styles.quality}>
        <div className={styles.container}>
          <div className={styles.qualityGrid}>
            <motion.div
              className={styles.qualityContent}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="Quality Assurance"
                title="Uncompromising Quality at Every Stage"
                align="left"
                light
              />
              <p className={styles.qualityText}>
                {manufacturing.production.qualityNote}
              </p>
              <motion.ul
                className={styles.qualityList}
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                {qualityBullets.map((point, idx) => (
                  <motion.li
                    key={idx}
                    className={styles.qualityItem}
                    variants={bulletVariant}
                  >
                    <CheckCircle size={18} className={styles.qualityCheck} />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className={styles.qualityImageWrap}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <img
                src={images.factoryCrane}
                alt="Crane quality inspection"
                className={styles.qualityImage}
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
            See Our Full Manufacturing Capabilities
          </h2>
          <p className={styles.ctaText}>
            From design to dispatch, Amtech delivers precision-engineered cranes
            backed by 35+ years of manufacturing excellence.
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
