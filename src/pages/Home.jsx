import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Phone,
  Award,
  Construction,
  MapPin,
  Settings,
  FileCheck,
  HeartPulse,
  Wrench,
  RefreshCw,
  Hammer,
  Truck,
  CheckCircle,
  Package,
  Star,
  Quote,
  Shield,
  ExternalLink,
} from 'lucide-react';

import SEO from '../components/ui/SEO';

import { company, stats, products, industries, images, clientLogos, testimonials, reviewStats } from '../data/siteData';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import StatsCounter from '../components/ui/StatsCounter';
import {
  fadeUp,
  stagger,
} from '../utils/animations';
import styles from './Home.module.css';



/* ── Stagger container variant ── */
const staggerContainer = stagger(0.1);

/* ================================================================
   MAGNETIC COMPONENT
   ================================================================ */
const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="magnetic"
    >
      {children}
    </motion.div>
  );
};

/* ================================================================
   HOME PAGE
   ================================================================ */
export default function Home() {
  /* Parallax for hero image */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  
  /* Mouse Follow Spotlight */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className={styles.home}>
      <SEO 
        title="Engineering Excellence Since 1990" 
        description="Amtech Cranes is India's leading manufacturer of high-precision EOT cranes, gantry cranes, and custom material handling solutions."
        canonical="/"
      />
      {/* Global Spotlight Layer */}
      <div className="spotlight-layer" aria-hidden="true" />

      {/* ─────────────────────────────────────────────
          1. HERO — Engaging Cinematic Full-Screen
          ───────────────────────────────────────────── */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div
          className={styles.heroBackground}
          style={{ scale: heroScale }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className={styles.heroImg}
          >
            <source src="/videos/hero-showcase.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay} />
          
          {/* Hero Decorative Elements */}
          <div className={styles.heroGridLines} />
          <div className={styles.heroAmbientGlow} />
        </motion.div>

        <div className={`${styles.heroContent} container`}>
          <motion.div
            className={styles.heroInner}
            style={{ opacity: heroOpacity, y: heroContentY }}
          >
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className={styles.heroPulseDot} />
              <span className={styles.heroBadgeText}>ESTABLISHED 1990 — GLOBAL STANDARDS</span>
            </motion.div>

            <div className={styles.heroTitleWrap}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Precision in
                <br />
                <span className={styles.heroTitleAccent}>Every Lift.</span>
              </motion.h1>
              
              <motion.div 
                className={styles.heroTitleMask}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Pioneering heavy engineering with India's most reliable 
              <span className={styles.textHighlight}> EOT Crane Solutions.</span> 
              Tailored for excellence, built for scale.
            </motion.p>

            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Magnetic strength={0.2}>
                <Button to="/configurator" variant="primary" size="lg" arrow>
                  Configure Your Crane
                </Button>
              </Magnetic>
              
              <Magnetic strength={0.4}>
                <Button
                  to="/products"
                  variant="outline"
                  size="lg"
                  className={styles.heroSecondaryBtn}
                >
                  Explore Solutions
                </Button>
              </Magnetic>
            </motion.div>

            {/* Floating Stats Block */}
            <motion.div
              className={styles.heroFloatingStats}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {stats.slice(0, 3).map((stat, i) => (
                <div key={i} className={styles.heroFloatingStat}>
                  <span className={styles.heroFloatingValue}>{stat.value}</span>
                  <span className={styles.heroFloatingLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Scroll Hook */}
        <motion.div
          className={styles.heroScrollIndicator}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className={styles.scrollText}>DISCOVER AMTECH</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────
          2. ABOUT SECTION — Kinetic Layout
          ───────────────────────────────────────────── */}
      <section className={styles.about}>
        <div className={`${styles.aboutInner} container`}>
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutVisual}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.visualContainer}>
                <motion.img 
                  src={images.aboutPreview} 
                  alt="Amtech Workshop" 
                  className={styles.aboutImg}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className={styles.aboutVisualOverlay} />
                
                {/* Floating Experience Badge */}
                <motion.div 
                  className={styles.expBadge}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className={styles.expNumber}>35+</span>
                  <span className={styles.expText}>Years of Engineering</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className={styles.aboutContent}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}>
                <SectionHeader
                  label="Our Foundation"
                  title="Where Engineering Meets Precision"
                  align="left"
                />
              </motion.div>
              
              <motion.p className={styles.aboutText} variants={fadeUp}>
                {company.description}
              </motion.p>

              <motion.div className={styles.aboutFeatures} variants={fadeUp}>
                <div className={styles.aboutFeature}>
                  <div className={styles.featureIconBox}><Shield size={24} /></div>
                  <div className={styles.featureInfo}>
                    <h4>Quality Assured</h4>
                    <p>Rigorous testing and ISO-compliant manufacturing processes.</p>
                  </div>
                </div>
                <div className={styles.aboutFeature}>
                  <div className={styles.featureIconBox}><Construction size={24} /></div>
                  <div className={styles.featureInfo}>
                    <h4>Custom Integration</h4>
                    <p>Cranes designed specifically for your facility's unique geometry.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button to="/about" variant="ghost" arrow>Learn More About Our Journey</Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. STATS — Integrated
          ───────────────────────────────────────────── */}
      <StatsCounter stats={stats} variant="dark" />

      {/* ─────────────────────────────────────────────
          4. PRODUCTS — Hover Reveal Grid
          ───────────────────────────────────────────── */}
      <section className={styles.products}>
        <div className="container">
          <SectionHeader
            label="Product Range"
            title="Industrial Powerhouse Solutions"
            description="Our specialized crane systems are engineered for zero-failure performance in the most demanding environments."
            align="center"
          />

          <motion.div
            className={styles.productsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.slice(0, 6).map((product) => (
              <motion.div key={product.id} variants={fadeUp} className={styles.productWrapper}>
                <Card
                  image={product.image}
                  title={product.name}
                  description={product.shortDesc}
                  link={`/products/${product.id}`}
                  className={styles.productCard}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. WHY AMTECH — Bento Interactive
          ───────────────────────────────────────────── */}
      <section className={styles.whyAmtech}>
        <div className="container">
          <SectionHeader
            label="The Amtech Advantage"
            title="Beyond Just Machinery"
            align="center"
            light
          />

          <div className={styles.bentoGrid}>
            <motion.div 
              className={`${styles.bentoBox} ${styles.boxLarge}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.boxContent}>
                <Award className={styles.boxIcon} size={40} />
                <h3>Engineering Mastery</h3>
                <p>35+ years of refining crane technology. We don't follow standards, we set them with in-house design and prototyping.</p>
                <Link to="/about" className={styles.boxLink}>Read our story <ArrowRight size={16} /></Link>
              </div>
              <div className={styles.boxGlow} />
            </motion.div>

            <motion.div className={styles.bentoBox} whileHover={{ y: -10 }}>
              <Settings className={styles.boxIcon} size={32} />
              <h3>Smart Automation</h3>
              <p>Integration of IoT and smart sensors for predictive maintenance.</p>
            </motion.div>

            <motion.div className={styles.bentoBox} whileHover={{ y: -10 }}>
              <Wrench className={styles.boxIcon} size={32} />
              <h3>24/7 Response</h3>
              <p>Minimal downtime with our nationwide rapid-response engineering teams.</p>
            </motion.div>

            <motion.div className={`${styles.bentoBox} ${styles.boxWide}`} whileHover={{ scale: 1.01 }}>
              <div className={styles.boxFlex}>
                <Shield className={styles.boxIcon} size={40} />
                <div className={styles.boxFlexText}>
                  <h3>Safety First Protocol</h3>
                  <p>Every Amtech crane undergoes 50+ rigorous safety checks before commissioning. Zero compromise on human life and structural integrity.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          6. INDUSTRIES — Dynamic Tiles
          ───────────────────────────────────────────── */}
      <section className={styles.industries}>
        <div className="container">
          <SectionHeader
            label="Impact"
            title="Versatility Across Sectors"
            align="center"
          />

          <div className={styles.industryTiles}>
            {industries.map((ind) => (
              <motion.div
                key={ind.id}
                className={styles.industryTile}
                whileHover="hover"
                initial="initial"
              >
                <div className={styles.tileBg}>
                  <img src={ind.image} alt={ind.name} />
                  <div className={styles.tileOverlay} />
                </div>
                <div className={styles.tileContent}>
                  <h3 className={styles.tileTitle}>{ind.name}</h3>
                  <motion.p 
                    className={styles.tileDesc}
                    variants={{
                      initial: { opacity: 0, height: 0 },
                      hover: { opacity: 1, height: 'auto' }
                    }}
                  >
                    {ind.desc}
                  </motion.p>
                  <Link to={`/industries/${ind.id}`} className={styles.tileLink}>
                    View Applications <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          7. TRUST & TESTIMONIALS — Social Proof
          ───────────────────────────────────────────── */}
      <section className={styles.trust}>
        <div className="container">
          <div className={styles.trustFlex}>
            <div className={styles.trustText}>
              <SectionHeader
                label="Trust Factor"
                title="Engineering Partner of Choice"
                align="left"
              />
              <p className={styles.trustLead}>
                From local manufacturers to global steel giants, Amtech is the backbone of heavy material handling for over 500+ premium clients.
              </p>
              
              <div className={styles.reviewBadges}>
                <div className={styles.reviewBadge}>
                  <div className={styles.badgeStars}><Star size={14} fill="currentColor" /> 5.0</div>
                  <span>{reviewStats.google.reviews} Google Reviews</span>
                </div>
                <div className={styles.reviewBadge}>
                  <div className={styles.badgeStars}><Star size={14} fill="currentColor" /> 5.0</div>
                  <span>{reviewStats.justDial.reviews} JustDial Reviews</span>
                </div>
              </div>
            </div>

            <div className={styles.testimonialSlider}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key="testimonial"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={styles.testimonialCard}
                >
                  <Quote className={styles.quoteIcon} size={40} />
                  <p className={styles.testimonialText}>{testimonials[1].text}</p>
                  <div className={styles.testimonialAuthor}>
                    <strong>{testimonials[1].name}</strong>
                    <span>Partner Industry</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          7.5. CLIENT LOGOS SHOWCASE
          ───────────────────────────────────────────── */}
      <section className={styles.clientsSection}>
        <div className="container">
          <h3 className={styles.clientsHeader}>Trusted by Industry Leaders Worldwide</h3>
          
          <div className={styles.logoMarquee}>
            {/* Top Track (Left to Right) */}
            <div className={styles.logoTrack}>
              {[...clientLogos.slice(0, 5), ...clientLogos.slice(0, 5), ...clientLogos.slice(0, 5)].map((logo, i) => (
                <div key={`top-${i}`} className={styles.clientLogo}>
                  <img src={logo.image} alt={logo.name} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Bottom Track (Right to Left) */}
            <div className={styles.logoTrackReverse}>
              {[...clientLogos.slice(4, 9), ...clientLogos.slice(4, 9), ...clientLogos.slice(4, 9)].map((logo, i) => (
                <div key={`bottom-${i}`} className={styles.clientLogo}>
                  <img src={logo.image} alt={logo.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          8. ROI INSIGHTS — Strategic Value
          ───────────────────────────────────────────── */}
      <section className={styles.roiSection}>
        <div className="container">
          <div className={styles.roiCard}>
            <div className={styles.roiContent}>
              <h2 className={styles.roiTitle}>Optimize Your <span className={styles.ctaAccent}>Operating Costs.</span></h2>
              <p className={styles.roiSubtitle}>
                Switching to Amtech Smart Cranes can reduce maintenance downtime by up to 40% and increase cycle efficiency by 25%.
              </p>
              <div className={styles.roiFeatures}>
                <div className={styles.roiFeature}>
                  <RefreshCw size={24} className={styles.roiIcon} />
                  <span>25% Faster Cycles</span>
                </div>
                <div className={styles.roiFeature}>
                  <Shield size={24} className={styles.roiIcon} />
                  <span>99.9% Safety Rating</span>
                </div>
                <div className={styles.roiFeature}>
                  <Award size={24} className={styles.roiIcon} />
                  <span>ISO Certified</span>
                </div>
              </div>
              <Button to="/roi-calculator" variant="primary" size="lg" arrow>Calculate Your ROI</Button>
            </div>
            <div className={styles.roiVisual}>
              <div className={styles.roiGlow} />
              <div className={styles.roiStat}>
                <span className={styles.statValue}>-40%</span>
                <span className={styles.statLabel}>Maintenance Cost</span>
              </div>
              <div className={styles.roiStat}>
                <span className={styles.statValue}>+15y</span>
                <span className={styles.statLabel}>Operational Life</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBg}>
            <div className={styles.ctaNoise} />
            <div className={styles.ctaGlow} />
          </div>
          
          <div className="container">
            <div className={styles.ctaInner}>
              <motion.h2 
                className={styles.ctaHeading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Let's Engineer Your <span className={styles.ctaAccent}>Next Big Project.</span>
              </motion.h2>
              <motion.p 
                className={styles.ctaLead}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Consult with our engineering leads for a custom-built crane solution 
                designed for your operational requirements.
              </motion.p>
              
              <motion.div 
                className={styles.ctaActions}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Magnetic strength={0.3}>
                  <Button to="/contact" variant="primary" size="lg">Get Engineering Quote</Button>
                </Magnetic>
                <div className={styles.ctaContactLink}>
                  <Phone size={20} />
                  <span>Call Us: {company.phone[0]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
