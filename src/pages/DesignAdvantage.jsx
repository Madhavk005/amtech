import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Globe, Layers } from 'lucide-react';
import { designAdvantages, stats, company, images } from '../data/siteData';
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
import styles from './DesignAdvantage.module.css';

const highlights = [
  {
    icon: Layers,
    title: 'No Castings Used',
    desc: 'Gearbox casings and pulleys are profile-cut from plates, eliminating casting defects and ensuring superior dimensional accuracy.',
  },
  {
    icon: Globe,
    title: 'European Components',
    desc: 'Brakes, Malmedie couplings, and hooks imported from Europe for higher-capacity cranes, guaranteeing international quality standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Export-Ready',
    desc: 'Special crane designs enabling containerized transport, serving clients across India and globally with ease.',
  },
];

const rowVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const interstitialImages = [
  { src: images.design2, alt: 'Crane design engineering' },
  { src: images.design4, alt: 'Manufacturing precision work' },
];

export default function DesignAdvantage() {
  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">
          Design
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
            <span>Design Advantage</span>
          </nav>
          <h1 className={styles.heroTitle}>
            In-House Design
            <br />
            Excellence
          </h1>
          <p className={styles.heroSubtitle}>
            Every crane is customised to exact operational requirements, designed
            in-house with proprietary software and full IS-standard compliance.
          </p>
        </motion.div>
      </section>

      {/* ─── Overview ─── */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <motion.div
              className={styles.overviewImageWrap}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <img
                src={images.design1}
                alt="In-house design department"
                className={styles.overviewImage}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className={styles.overviewContent}
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="Our Approach"
                title="Design That Delivers Precision"
                align="left"
              />
              <p className={styles.overviewText}>
                Amtech maintains a dedicated in-house design department staffed
                with experienced engineers who utilise both 2D and 3D design
                tools alongside customised proprietary software. This enables
                every crane to be designed from the ground up for its specific
                application.
              </p>
              <p className={styles.overviewText}>
                From initial concept through detailed engineering drawings, our
                team ensures every component meets IS standards while
                incorporating the latest advancements in crane technology and
                safety.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Design Advantages — Numbered List ─── */}
      <section className={styles.advantagesSection}>
        <div className={styles.container}>
          <SectionHeader
            label="Our Edge"
            title="8 Design Advantages That Set Us Apart"
            align="left"
          />

          {/* First 4 advantages */}
          <motion.div
            className={styles.advantagesList}
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {designAdvantages.slice(0, 4).map((adv, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const isEven = idx % 2 === 1;
              return (
                <motion.div
                  key={idx}
                  className={`${styles.advantageRow} ${isEven ? styles.advantageRowAlt : ''}`}
                  variants={rowVariant}
                >
                  <span className={styles.advantageNum}>{num}</span>
                  <div className={styles.advantageText}>
                    <h4 className={styles.advantageTitle}>{adv.title}</h4>
                    <p className={styles.advantageDesc}>{adv.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Interstitial image break */}
          <motion.div
            className={styles.interstitial}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <img
              src={interstitialImages[0].src}
              alt={interstitialImages[0].alt}
              className={styles.interstitialImg}
              loading="lazy"
            />
          </motion.div>

          {/* Last 4 advantages */}
          <motion.div
            className={styles.advantagesList}
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {designAdvantages.slice(4).map((adv, idx) => {
              const actualIdx = idx + 4;
              const num = String(actualIdx + 1).padStart(2, '0');
              const isEven = idx % 2 === 1;
              return (
                <motion.div
                  key={actualIdx}
                  className={`${styles.advantageRow} ${isEven ? styles.advantageRowAlt : ''}`}
                  variants={rowVariant}
                >
                  <span className={styles.advantageNum}>{num}</span>
                  <div className={styles.advantageText}>
                    <h4 className={styles.advantageTitle}>{adv.title}</h4>
                    <p className={styles.advantageDesc}>{adv.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Second interstitial image */}
          <motion.div
            className={styles.interstitial}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <img
              src={interstitialImages[1].src}
              alt={interstitialImages[1].alt}
              className={styles.interstitialImg}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Key Highlights — 3 Column Cards ─── */}
      <section className={styles.highlights}>
        <div className={styles.container}>
          <SectionHeader
            label="Key Highlights"
            title="What Makes Our Design Different"
            align="center"
          />
          <motion.div
            className={styles.highlightsGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className={styles.highlightCard}
                  variants={cardVariant}
                >
                  <div className={styles.highlightIconWrap}>
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
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
            Need a Custom Crane Design?
          </h2>
          <p className={styles.ctaText}>
            Our in-house engineering team is ready to design a crane tailored to
            your exact operational requirements.
          </p>
          <div className={styles.ctaActions}>
            <Button variant="white" to="/contact" size="lg" arrow>
              Get in Touch
            </Button>
            <Button variant="primary" to="/manufacturing" size="lg" arrow>
              Explore Manufacturing
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
