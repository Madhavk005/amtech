import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Lightbulb,
  Shield,
  HardHat,
  Users,
  ArrowRight,
  ChevronRight,
  PenTool,
  FileCheck2,
  Cog,
  GemIcon,
  Cylinder,
  ClipboardCheck,
  Wrench,
  Globe,
} from 'lucide-react';
import { company, stats, designAdvantages, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import StatsCounter from '../components/ui/StatsCounter';
import Button from '../components/ui/Button';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  stagger,
  blurIn,
  viewport,
} from '../utils/animations';
import styles from './About.module.css';

/* Icon map for design advantages */
const advantageIcons = [
  PenTool,
  FileCheck2,
  Cog,
  GemIcon,
  Cylinder,
  ClipboardCheck,
  Wrench,
  Globe,
];

/* Values data */
const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Continuously advancing our engineering capabilities to develop smarter, more efficient crane solutions for tomorrow\'s challenges.',
  },
  {
    icon: Shield,
    title: 'Quality',
    desc: 'Uncompromising standards in every weld, every component, and every finished crane that leaves our facility.',
  },
  {
    icon: HardHat,
    title: 'Safety',
    desc: 'Designing and building every system with rigorous safety protocols that protect operators and equipment alike.',
  },
  {
    icon: Users,
    title: 'Customer First',
    desc: 'Building lasting partnerships through responsive service, tailored solutions, and unwavering commitment to client success.',
  },
];

export default function About() {
  return (
    <main className={styles.page}>
      {/* ════════════════════════════════════════════
          1. PAGE HERO — Watermark Style
          ════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={images.aboutMain} alt="Amtech Cranes Facility" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <motion.nav
              className={styles.breadcrumb}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-label="Breadcrumb"
            >
              <Link to="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <ChevronRight size={14} className={styles.breadcrumbSep} />
              <span className={styles.breadcrumbCurrent}>About</span>
            </motion.nav>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              The Story Behind Every
              <br />
              Crane We Build
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Three decades of engineering excellence, innovation, and an
              unwavering commitment to quality — powering industries across the
              globe.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. COMPANY STORY — Asymmetric Two-Column
          ════════════════════════════════════════════ */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            {/* Image — 55% */}
            <motion.div
              className={styles.storyImageWrap}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className={styles.storyAccentStrip} />
              <img
                src={images.manufacturingMain || images.aboutMain}
                alt="Industrial crane facility"
                className={styles.storyImage}
                loading="lazy"
              />
              <div className={styles.storyBadge}>
                <div className={styles.storyBadgeInner}>
                  <span className={styles.storyBadgeNum}>30+</span>
                  <span className={styles.storyBadgeText}>Years of<br/>Excellence</span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className={styles.storyContent}
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.span className={styles.storyLabel} variants={fadeUp}>
                Our Journey
              </motion.span>

              <motion.h2 className={styles.storyTitle} variants={fadeUp}>
                Built on Excellence
                <br />
                Since {company.founded}
              </motion.h2>

              <motion.p className={styles.storyText} variants={fadeUp}>
                Founded in {company.founded}, Amtech began with a clear mission:
                to manufacture world-class Electric Overhead Travelling (EOT)
                cranes that meet the most demanding industrial standards. What
                started as a modest workshop in Ludhiana has grown into a trusted
                name with a sprawling {company.facility} manufacturing facility.
              </motion.p>

              <motion.p className={styles.storyText} variants={fadeUp}>
                Our growth has been driven by an unwavering commitment to
                engineering excellence, continuous innovation, and a relentless
                focus on quality and customer satisfaction. Today, Amtech stands
                as a leader in crane manufacturing, offering end-to-end solutions
                from in-house design to installation and after-sales support.
              </motion.p>

              <motion.div className={styles.storyInlineStat} variants={fadeUp}>
                <span className={styles.storyStatValue}>
                  {company.cranesCommissioned}
                </span>
                <span className={styles.storyStatLabel}>
                  cranes successfully commissioned across India and beyond
                </span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  to="/products"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconRight
                >
                  View Our Products
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. MISSION & VISION — Side-by-Side Cards
          ════════════════════════════════════════════ */}
      <section className={styles.missionVision}>
        <div className={styles.container}>
          <div className={styles.mvGrid}>
            {/* Mission - Dark Cinematic */}
            <motion.div
              className={styles.mvCardDark}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className={styles.mvCardGlow} />
              <div className={styles.mvIconWrapDark}>
                <Target size={32} />
              </div>
              <h3 className={styles.mvTitleDark}>Our Mission</h3>
              <p className={styles.mvTextDark}>
                To deliver world-class crane solutions that empower industries
                with safe, reliable, and efficient material handling systems —
                built with precision engineering and backed by unwavering service
                commitment.
              </p>
            </motion.div>

            {/* Vision - Light Glass */}
            <motion.div
              className={styles.mvCardLight}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className={styles.mvIconWrapLight}>
                <Eye size={32} />
              </div>
              <h3 className={styles.mvTitleLight}>Our Vision</h3>
              <p className={styles.mvTextLight}>
                To be the most trusted name in crane manufacturing globally,
                setting benchmarks in innovation, quality, and customer
                satisfaction — empowering industries to operate safely and
                efficiently.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. DESIGN ADVANTAGES — Bento Grid
          ════════════════════════════════════════════ */}
      <section className={styles.advantages}>
        <div className={styles.container}>
          <SectionHeader
            label="Our Edge"
            title="Engineered to Outperform"
            subtitle="Every crane we build reflects decades of engineering expertise and a relentless pursuit of perfection."
          />

          <motion.div
            className={styles.bentoGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {designAdvantages.map((adv, idx) => {
              const Icon = advantageIcons[idx] || Cog;
              const num = String(idx + 1).padStart(2, '0');
              return (
                <motion.div
                  className={`${styles.bentoCard} ${idx < 2 ? styles.bentoWide : ''}`}
                  key={idx}
                  variants={fadeUp}
                >
                  <span className={styles.bentoNumber} aria-hidden="true">
                    {num}
                  </span>
                  <div className={styles.bentoIconWrap}>
                    <Icon size={24} />
                  </div>
                  <h4 className={styles.bentoTitle}>{adv.title}</h4>
                  <p className={styles.bentoDesc}>{adv.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. VALUES — Dark Section
          ════════════════════════════════════════════ */}
      <section className={styles.values}>
        <div className={styles.valuesGlow} aria-hidden="true" />
        <div className={styles.container}>
          <SectionHeader
            label="Our Values"
            title="What Drives Us"
            light
          />

          <motion.div
            className={styles.valuesGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  className={styles.valueCard}
                  key={idx}
                  variants={fadeUp}
                >
                  <div className={styles.valueIconWrap}>
                    <Icon size={28} />
                  </div>
                  <h4 className={styles.valueTitle}>{val.title}</h4>
                  <p className={styles.valueDesc}>{val.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. STATS + CTA
          ════════════════════════════════════════════ */}
      <StatsCounter stats={stats} variant="dark" />

      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.h2 className={styles.ctaTitle} variants={fadeUp}>
              Let's Build Something Together
            </motion.h2>
            <motion.p className={styles.ctaText} variants={fadeUp}>
              At Amtech, we don't just build cranes — we build partnerships. Let
              us understand your challenges and engineer a solution that drives
              your operations forward.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconRight
              >
                Contact Us Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
