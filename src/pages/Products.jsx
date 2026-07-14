import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { products, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { fadeUp, stagger, viewport } from '../utils/animations';
import SEO from '../components/ui/SEO';
import styles from './Products.module.css';

export default function Products() {
  // We'll use the marquee images for a scrolling gallery
  const marqueeImages = [
    images.marquee1,
    images.marquee2,
    images.marquee3,
    images.marquee4,
    images.marquee5,
    images.aboutGallery1,
    images.aboutGallery2,
    images.aboutGallery3,
    images.aboutGallery4,
    images.aboutGallery5,
  ];

  return (
    <main className={styles.page}>
      <SEO 
        title="Our Crane Equipments | EOT & Gantry Cranes" 
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
              <span className={styles.breadcrumbCurrent}>Equipments</span>
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
          2. PRODUCT SHOWCASE — Premium Alternating Grid
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

          <div className={styles.premiumGrid}>
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                className={styles.premiumCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={index}
              >
                <Link to={`/products/${product.id}`} className={styles.premiumLink}>
                  <div className={styles.premiumImageWrap}>
                    <img src={product.image} alt={product.name} className={styles.premiumImage} loading="lazy" />
                    <div className={styles.premiumImageOverlay} />
                    <div className={styles.viewDetailsBadge}>
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className={styles.premiumContent}>
                    <h3 className={styles.premiumTitle}>{product.name}</h3>
                    <p className={styles.premiumDesc}>{product.shortDesc}</p>
                    <div className={styles.premiumFeatures}>
                      {product.features?.slice(0, 3).map((f, i) => (
                        <span key={i} className={styles.featurePill}>{f.title}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. IMAGE MARQUEE
          ════════════════════════════════════════════ */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeHeader}>
          <h3 className={styles.marqueeTitle}>Excellence in Action</h3>
          <p className={styles.marqueeSubtitle}>Glimpses of our engineered solutions across industries</p>
        </div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Double the array for seamless infinite scroll */}
            {[...marqueeImages, ...marqueeImages].map((img, idx) => (
              <div key={idx} className={styles.marqueeItem}>
                <img src={img} alt={`Amtech equipment showcase ${idx}`} className={styles.marqueeImage} loading="lazy"/>
                <div className={styles.marqueeItemOverlay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. CTA SECTION
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
