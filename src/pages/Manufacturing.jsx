import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  Flame,
  Container,
  Boxes,
  Settings,
  CheckCircle,
  Phone,
  Factory,
  PenTool,
  Cpu,
} from 'lucide-react';
import { designAdvantages, stats, company, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  stagger,
  scaleIn,
  viewport,
} from '../utils/animations';
import styles from './Manufacturing.module.css';

/* Manufacturing capabilities data */
const capabilities = [
  {
    icon: Flame,
    title: 'Ladle Handling Cranes',
    desc: 'Purpose-built cranes for safe and efficient handling of molten metal ladles in steel melting shops, designed for extreme-temperature environments.',
  },
  {
    icon: Container,
    title: 'Scrap Feeding Cranes',
    desc: 'Heavy-duty crane systems engineered for reliable scrap charging into furnaces, maximizing productivity and operational safety.',
  },
  {
    icon: Boxes,
    title: 'Raw Material Handling',
    desc: 'Versatile crane solutions for efficient transport and management of raw materials across your manufacturing facility.',
  },
  {
    icon: Settings,
    title: 'Custom Crane Solutions',
    desc: 'Tailor-made crane designs to meet unique operational requirements, from concept through commissioning.',
  },
];

/* Quality commitment points */
const qualityPoints = [
  'Rigorous in-process and final inspection protocols',
  'Load testing and performance verification on every crane',
  'Full compliance with IS standards and industry regulations',
  'Documented quality records and traceability',
  'Continuous improvement through customer feedback',
];

const capVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Manufacturing() {
  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">Manufacturing</span>
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
          <h1 className={styles.heroTitle}>
            Where Precision<br />Meets Scale
          </h1>
          <p className={styles.heroSubtitle}>
            State-of-the-art manufacturing capabilities delivering world-class
            crane systems from our 50,000+ sq.m. facility.
          </p>
        </motion.div>
      </section>

      {/* ─── Sub-Page Navigation ─── */}
      <section className={styles.subNav}>
        <div className={styles.container}>
          <motion.div
            className={styles.subNavGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {[
              {
                icon: Factory,
                title: 'Production',
                desc: 'Large fabrication facility, sub-assembly centers, and heavy machine shop equipped with CNC machines.',
                path: '/manufacturing/production',
              },
              {
                icon: PenTool,
                title: 'Design Advantage',
                desc: 'In-house design department with 2D & 3D software for customised, IS-standard compliant cranes.',
                path: '/manufacturing/design-advantage',
              },
              {
                icon: Cpu,
                title: 'Automation & Computerisation',
                desc: 'State-of-the-art CNC machine centre and customised software for precision manufacturing.',
                path: '/manufacturing/automation-computerisation',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUp}>
                  <Link to={item.path} className={styles.subNavCard}>
                    <div className={styles.subNavIconWrap}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className={styles.subNavContent}>
                      <h3 className={styles.subNavTitle}>{item.title}</h3>
                      <p className={styles.subNavDesc}>{item.desc}</p>
                    </div>
                    <ArrowRight size={20} className={styles.subNavArrow} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
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
                src={images.factory1}
                alt="Amtech manufacturing facility"
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
                title="State-of-the-Art Manufacturing"
                align="left"
              />
              <p className={styles.facilityText}>
                Our facility spans over 50,000 square meters, equipped with the
                latest machinery and technology. From precision cutting and welding
                to assembly and testing, every stage of production is carried out
                under one roof to ensure quality control and timely delivery.
              </p>
              <p className={styles.facilityText}>
                With decades of experience in EOT crane manufacturing, our
                state-of-the-art production lines handle projects of any scale
                — from standard models to fully customized heavy-duty solutions.
              </p>

              <div className={styles.miniStats}>
                <div className={styles.miniStat}>
                  <span className={styles.miniStatValue}>50,000+</span>
                  <span className={styles.miniStatLabel}>Sq. Mt.</span>
                </div>
                <div className={styles.miniStatDivider} />
                <div className={styles.miniStat}>
                  <span className={styles.miniStatValue}>Latest</span>
                  <span className={styles.miniStatLabel}>Technology</span>
                </div>
                <div className={styles.miniStatDivider} />
                <div className={styles.miniStat}>
                  <span className={styles.miniStatValue}>IS-Standard</span>
                  <span className={styles.miniStatLabel}>Compliance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Capabilities — Bento Grid ─── */}
      <section className={styles.capSection}>
        <div className={styles.container}>
          <SectionHeader
            label="What We Build"
            title="Manufacturing Capabilities"
            align="center"
          />
          <motion.div
            className={styles.bentoGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const num = String(idx + 1).padStart(2, '0');
              const isFeature = idx === 0;
              return (
                <motion.div
                  key={idx}
                  className={`${styles.bentoCard} ${isFeature ? styles.bentoFeature : ''}`}
                  variants={capVariant}
                >
                  <span className={styles.bentoNum}>{num}</span>
                  <div className={styles.bentoIconWrap}>
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.bentoTitle}>{cap.title}</h3>
                  <p className={styles.bentoDesc}>{cap.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Design Advantages ─── */}
      <section className={styles.advantagesSection}>
        <div className={styles.container}>
          <SectionHeader
            label="Our Edge"
            title="Engineering That Sets Us Apart"
            align="left"
          />
          <motion.div
            className={styles.advantagesList}
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {designAdvantages.map((adv, idx) => {
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
        </div>
      </section>

      {/* ─── Quality Section (dark) ─── */}
      <section className={styles.quality}>
        <div className={styles.container}>
          <motion.div
            className={styles.qualityInner}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <SectionHeader
              label="Quality Assurance"
              title="Uncompromising Quality Standards"
              align="left"
              light
            />
            <p className={styles.qualityText}>
              Quality is at the heart of everything we do. From raw material
              sourcing to final dispatch, every crane undergoes rigorous
              inspection and testing. Our manufacturing processes comply with
              IS standards, ensuring every product meets the highest benchmarks
              of safety, durability, and performance.
            </p>
            <ul className={styles.qualityList}>
              {qualityPoints.map((point, idx) => (
                <li key={idx} className={styles.qualityItem}>
                  <CheckCircle size={18} className={styles.qualityCheck} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
          <h2 className={styles.ctaTitle}>Ready to Build Your Next Crane?</h2>
          <p className={styles.ctaText}>
            Partner with Amtech for world-class manufacturing backed by
            35+ years of expertise.
          </p>
          <div className={styles.ctaActions}>
            <Button variant="white" to="/contact" size="lg" arrow>
              Contact Us
            </Button>
            <a
              href={`tel:${company.phone[0].replace(/\s/g, '')}`}
              className={styles.ctaPhone}
            >
              <Phone size={20} strokeWidth={2} />
              <span>{company.phone[0]}</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
