import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Shield,
  Settings,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import { products } from '../data/siteData';
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
      
      {/* 1. PRODUCT OVERVIEW (Split Layout) */}
      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span>{product.name}</span>
          </nav>
          
          <div className={styles.overviewGrid}>
            {/* Left: Image */}
            <motion.div 
              className={styles.overviewImageWrap}
              variants={fadeRight}
              initial="hidden"
              animate="visible"
            >
              <img src={product.image} alt={product.name} className={styles.overviewImage} />
            </motion.div>

            {/* Right: Content */}
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
              <p className={styles.productDesc}>
                Built with premium materials and engineered to Indian Standards,
                every unit undergoes rigorous pre-dispatch testing to ensure
                operational reliability from day one.
              </p>
              <div className={styles.overviewActions}>
                <Button to="#quote" variant="primary" size="lg" arrow>Request a Quote</Button>
                <Button to="/contact" variant="outline" size="lg">Contact Sales</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES GRID (Clean Symmetric) */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
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
      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section id="quote" className={styles.quoteSection}>
        <div className={styles.container}>
          <div className={styles.quoteGrid}>
            <div className={styles.quoteInfo}>
              <SectionHeader 
                label="Start Your Project"
                title={`Request a Quote for ${product.name}`}
                align="left"
              />
              <p className={styles.quoteDesc}>
                Our engineering team works closely with you to design and manufacture cranes tailored to your exact operational requirements. Fill out the form to get a detailed specification and pricing estimate.
              </p>
              <ul className={styles.quoteChecklist}>
                <li><CheckCircle size={20} className={styles.checkIcon}/> Comprehensive operational analysis</li>
                <li><CheckCircle size={20} className={styles.checkIcon}/> Tailored specification sheets</li>
                <li><CheckCircle size={20} className={styles.checkIcon}/> Transparent pricing & timelines</li>
              </ul>
            </div>
            
            <div className={styles.quoteFormWrap}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
