import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Shield,
  Settings,
  Cpu,
  AlertTriangle,
  Phone,
  Mail
} from 'lucide-react';
import { products, company, images } from '../data/siteData';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import { fadeUp, fadeLeft, fadeRight, stagger, viewport } from '../utils/animations';
import SEO from '../components/ui/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import styles from './ProductDetail.module.css';

const featureIcons = [Shield, Settings, Cpu, CheckCircle, Shield, Settings];

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

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
    '/images/trolley_marquee.png',
  ];

  if (!product) {
    return (
      <main className={styles.page}>
        <section className={styles.notFound}>
          <div className={styles.container}>
            <div className={styles.notFoundContent}>
              <AlertTriangle size={48} className={styles.notFoundIcon} />
              <h1 className={styles.notFoundTitle}>Product Not Found</h1>
              <p className={styles.notFoundText}>
                The product you are looking for does not exist or may have been moved.
              </p>
              <Button to="/products" variant="primary" size="lg" icon={ArrowRight} iconRight>
                Browse All Products
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SEO 
        title={`${product.name} | Amtech Cranes`}
        description={product.shortDesc}
      />
      
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products">Equipment</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>
        
        <div className={styles.pageLayout}>
          
          {/* PRODUCT OVERVIEW */}
          <div className={styles.overviewGrid}>
            <motion.div 
              className={styles.overviewImageWrap}
              variants={fadeRight}
              initial="hidden"
              animate="visible"
            >
              <img src={product.image} alt={product.name} className={styles.overviewImage} />
            </motion.div>

            <motion.div 
              className={styles.overviewContent}
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
            >
              <span className={styles.brandBadge}>Amtech Precision</span>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <p className={styles.productTagline}>{product.tagline}</p>
              <div className={styles.productDivider} />
              <p className={styles.productDesc}>{product.description}</p>
              <div className={styles.overviewActions}>
                <Button to="#quote" variant="primary" size="lg" arrow>Request a Quote</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className={styles.featuresSection}>
        <div className={styles.featuresSectionInner}>
          <SectionHeader 
            label="Key Features"
            title="Engineered for Excellence"
            align="center"
          />
          <motion.div 
            className={styles.featuresGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {product.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <motion.div key={i} className={styles.featureCard} variants={fadeUp}>
                  <div className={styles.featureIconWrap}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* MARQUEE SECTION */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeHeader}>
          <SectionHeader 
            label="Amtech in Action"
            title="Industrial Excellence, Deployed"
            align="center"
          />
        </div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {[...marqueeImages, ...marqueeImages].map((img, i) => (
              <div key={i} className={styles.marqueeItem}>
                <img src={img} alt={`Showcase ${i}`} loading="lazy" className={styles.marqueeImage} />
                <div className={styles.marqueeItemOverlay} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <div id="quote" className={styles.quoteSection}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteGrid}>
            <div className={styles.quoteInfo}>
              <SectionHeader 
                label="Start Your Project"
                title={`Request a Quote for ${product.name}`}
                align="left"
              />
              <p className={styles.quoteDesc}>
                Our engineering team works closely with you to design and manufacture cranes tailored to your exact operational requirements.
              </p>
              <ul className={styles.quoteChecklist}>
                <li><CheckCircle size={20} className={styles.checkIcon}/> Comprehensive operational analysis</li>
                <li><CheckCircle size={20} className={styles.checkIcon}/> Tailored specification sheets</li>
              </ul>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-heading)' }}>Or Reach Out Directly:</h4>
                <a href={`tel:${company.phone[0].replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <Phone size={20} className={styles.checkIcon}/> {company.phone[0]}
                </a>
                <a href={`mailto:${company.salesEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <Mail size={20} className={styles.checkIcon}/> {company.salesEmail}
                </a>
              </div>
            </div>
            <div className={styles.quoteFormWrap}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
