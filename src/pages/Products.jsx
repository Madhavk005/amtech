import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { products, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { fadeUp, stagger, scaleIn, viewport } from '../utils/animations';
import SEO from '../components/ui/SEO';
import styles from './Products.module.css';

export default function Products() {

  return (
    <main className={styles.page}>
      <SEO 
        title="Our Crane Solutions | EOT & Gantry Cranes" 
        description="Explore Amtech's wide range of industrial crane solutions, including single and double girder EOT cranes, gantry cranes, and specialized lifting equipment."
        canonical="/products"
      />
      {/* ════════════════════════════════════════════
          1. PAGE HERO — Cinematic
          ════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={images.aboutMain || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'} alt="Amtech Cranes Products" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className={styles.breadcrumb}>
              <Link to="/" className={styles.breadcrumbLink}>
                Home
              </Link>
              <ChevronRight size={14} className={styles.breadcrumbSep} />
              <span className={styles.breadcrumbCurrent}>Products</span>
            </nav>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Our Crane Solutions
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              From single girder overhead cranes to heavy-duty goliath systems —
              engineered for safety, precision, and long-term reliability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. PRODUCT SHOWCASE — Alternating Layout
          ════════════════════════════════════════════ */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <SectionHeader
              label="Equipment Portfolio"
              title="Engineered for Performance"
              subtitle="Every product is designed in-house and manufactured to Indian Standards, backed by 35+ years of industry expertise."
            />
          </div>

          <div className={styles.simpleGrid}>
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                className={styles.simpleCard}
                variants={fadeUp}
              >
                <Link to={`/products/${product.id}`} className={styles.simpleLink}>
                  <div className={styles.simpleImageWrap}>
                    <img src={product.image} alt={product.name} className={styles.simpleImage} loading="lazy" />
                  </div>
                  <div className={styles.simpleContent}>
                    <h3 className={styles.simpleTitle}>{product.name}</h3>
                    <p className={styles.simpleDesc}>{product.shortDesc}</p>
                    <span className={styles.simpleAction}>
                      Learn More <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. CTA SECTION
          ════════════════════════════════════════════ */}
      <section className={styles.cta}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.container}>
          <motion.div
            className={styles.ctaInner}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.h2 className={styles.ctaTitle} variants={fadeUp}>
              Need a Custom Solution?
            </motion.h2>
            <motion.p className={styles.ctaText} variants={fadeUp}>
              Our engineering team works closely with you to design and
              manufacture cranes tailored to your exact operational requirements.
              Every unit is custom-engineered and pre-tested before dispatch.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconRight
              >
                Request a Quote
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
