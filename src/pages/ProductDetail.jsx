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
import { products, company } from '../data/siteData';
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
      
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products">Equipment</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>
        
        <div className={styles.pageLayout}>
          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarWidget}>
              <h3 className={styles.sidebarTitle}>Equipment</h3>
              <ul className={styles.sidebarMenu}>
                {products.map((p) => (
                  <li key={p.id}>
                    <Link 
                      to={`/products/${p.id}`} 
                      className={p.id === productId ? styles.activeSidebarLink : styles.sidebarLink}
                    >
                      <ChevronRight size={14} /> {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.sidebarHelp}>
              <h3 className={styles.helpTitle}>Do you Need any Help?</h3>
              <p className={styles.helpText}>
                Prefer speaking with a human to filling out a form? Reach out to us directly:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', marginTop: '15px' }}>
                <a href={`tel:${company.phone[0].replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)', textDecoration: 'none', fontWeight: 600 }}>
                  <Phone size={16} /> {company.phone[0]}
                </a>
                <a href={`mailto:${company.salesEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)', textDecoration: 'none', fontWeight: 600 }}>
                  <Mail size={16} /> Sales Team
                </a>
                <a href={`mailto:${company.serviceEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-heading)', textDecoration: 'none', fontWeight: 600 }}>
                  <Mail size={16} /> Service Team
                </a>
              </div>
              <Button to="/contact" variant="primary" arrow fullWidth>Contact Us</Button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className={styles.mainContent}>
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

            {/* FEATURES GRID */}
            <div className={styles.featuresSection}>
              <SectionHeader 
                label="Key Features"
                title="Engineered for Excellence"
                align="left"
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

            {/* QUOTE SECTION */}
            <div id="quote" className={styles.quoteSection}>
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
                </div>
                <div className={styles.quoteFormWrap}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
