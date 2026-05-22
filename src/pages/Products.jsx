import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { products } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { fadeUp, stagger, scaleIn, viewport } from '../utils/animations';
import SEO from '../components/ui/SEO';
import styles from './Products.module.css';

export default function Products() {
  /* Split products for creative grid layout */
  const row1 = products.slice(0, 2); // 60/40 split
  const row2 = products.slice(2, 5); // 3 equal
  const row3 = products.slice(5, 6); // 1 full-width horizontal

  return (
    <main className={styles.page}>
      <SEO 
        title="Our Crane Solutions | EOT & Gantry Cranes" 
        description="Explore Amtech's wide range of industrial crane solutions, including single and double girder EOT cranes, gantry cranes, and specialized lifting equipment."
        canonical="/products"
      />
      {/* ════════════════════════════════════════════
          1. PAGE HERO — Watermark Style
          ════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <span className={styles.heroWatermark} aria-hidden="true">
          Products
        </span>

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
            <span className={styles.breadcrumbCurrent}>Products</span>
          </motion.nav>

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
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. PRODUCT GRID — Creative Layout
          ════════════════════════════════════════════ */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <SectionHeader
            label="Equipment"
            title="Engineered for Performance"
            subtitle="Every product is designed in-house and manufactured to Indian Standards, backed by 35+ years of industry expertise."
          />

          {/* Row 1: 60/40 split */}
          <motion.div
            className={styles.row1}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {row1.map((product, index) => (
              <motion.div
                key={product.id}
                className={index === 0 ? styles.row1Large : styles.row1Small}
                variants={scaleIn}
              >
                <Card
                  image={product.image}
                  title={product.name}
                  description={product.shortDesc}
                  link={`/products/${product.id}`}
                  linkText="Learn More"
                  variant={index === 0 ? 'overlay' : 'default'}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: 3 equal columns */}
          <motion.div
            className={styles.row2}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {row2.map((product, index) => (
              <motion.div key={product.id} variants={fadeUp}>
                <Card
                  image={product.image}
                  title={product.name}
                  description={product.shortDesc}
                  link={`/products/${product.id}`}
                  linkText="Learn More"
                  variant={index === 1 ? 'overlay' : 'default'}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 3: Full-width horizontal card */}
          {row3.map((product) => (
            <motion.div
              key={product.id}
              className={styles.row3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <Link
                to={`/products/${product.id}`}
                className={styles.horizontalCard}
              >
                <div className={styles.horizontalImageWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.horizontalImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.horizontalContent}>
                  <span className={styles.horizontalLabel}>Featured</span>
                  <h3 className={styles.horizontalTitle}>{product.name}</h3>
                  <p className={styles.horizontalDesc}>{product.shortDesc}</p>
                  <span className={styles.horizontalLink}>
                    Learn More
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. CTA SECTION
          ════════════════════════════════════════════ */}
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
