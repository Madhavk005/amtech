import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { products, company, industries } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ContactForm from '../components/ui/ContactForm';
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  stagger,
  viewport,
} from '../utils/animations';
import styles from './ProductDetail.module.css';

/* Application badge labels derived from industries */
const applicationLabels = [
  'Steel Plants',
  'Power Plants',
  'Paper Industry',
  'Heavy Industry',
];

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  /* ── Not Found ── */
  if (!product) {
    return (
      <main className={styles.page}>
        <section className={styles.notFound}>
          <div className={styles.container}>
            <motion.div
              className={styles.notFoundContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AlertTriangle size={48} className={styles.notFoundIcon} />
              <h1 className={styles.notFoundTitle}>Product Not Found</h1>
              <p className={styles.notFoundText}>
                The product you are looking for does not exist or may have been
                moved.
              </p>
              <Button
                to="/products"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconRight
              >
                Browse All Products
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className={styles.page}>
      {/* ════════════════════════════════════════════
          1. PAGE HERO — Breadcrumb + Title
          ════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <span className={styles.heroWatermark} aria-hidden="true">
          {product.name.split(' ')[0]}
        </span>

        <div className={styles.heroContent}>
          <motion.nav
            className={styles.breadcrumb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Breadcrumb"
          >
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <Link to="/products" className={styles.breadcrumbLink}>
              Products
            </Link>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </motion.nav>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {product.name}
          </motion.h1>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. PRODUCT OVERVIEW — Two Column
          ════════════════════════════════════════════ */}
      <section className={styles.overview}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            {/* Image */}
            <motion.div
              className={styles.overviewImageCol}
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className={styles.overviewImageWrap}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.overviewImage}
                  loading="eager"
                />
              </div>

              {/* Application badges */}
              <div className={styles.badges}>
                {applicationLabels.map((label) => (
                  <span key={label} className={styles.badge}>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className={styles.overviewContent}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.span className={styles.overviewLabel} variants={fadeUp}>
                Product Overview
              </motion.span>

              <motion.h2 className={styles.overviewTitle} variants={fadeUp}>
                {product.name}
              </motion.h2>

              <motion.p className={styles.overviewDesc} variants={fadeUp}>
                {product.description}
              </motion.p>

              <motion.p className={styles.overviewDesc} variants={fadeUp}>
                Built with premium materials and engineered to Indian Standards,
                every unit undergoes rigorous pre-dispatch testing to ensure
                operational reliability from day one — backed by Amtech's 35+
                years of expertise.
              </motion.p>

              <motion.div className={styles.overviewActions} variants={fadeUp}>
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconRight
                >
                  Request a Quote
                </Button>
                <Button
                  as="a"
                  href="tel:+918054510055"
                  variant="ghost"
                  size="lg"
                  icon={Phone}
                >
                  +91 80545-10055
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. KEY FEATURES — 3x2 Grid
          ════════════════════════════════════════════ */}
      <section className={styles.features}>
        <div className={styles.container}>
          <SectionHeader
            label="Why Choose This Product"
            title="Key Features"
            subtitle="Every feature is engineered to deliver maximum performance, safety, and value for your operations."
          />

          <motion.div
            className={styles.featuresGrid}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {product.features.map((feature, index) => {
              const num = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={index}
                  className={styles.featureCard}
                  variants={fadeUp}
                >
                  <span className={styles.featureNumber} aria-hidden="true">
                    {num}
                  </span>
                  <div className={styles.featureIconWrap}>
                    <CheckCircle size={22} className={styles.featureIcon} />
                  </div>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. RELATED PRODUCTS — 3-Column Grid
          ════════════════════════════════════════════ */}
      <section className={styles.related}>
        <div className={styles.container}>
          <SectionHeader
            label="More Solutions"
            title="Explore More"
            subtitle="Discover the full range of Amtech crane and material handling solutions."
          />

          <motion.div
            className={styles.relatedGrid}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {otherProducts.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <Card
                  image={p.image}
                  title={p.name}
                  description={p.shortDesc}
                  link={`/products/${p.id}`}
                  linkText="View Details"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. QUOTE CTA — Dark Section with Form
          ════════════════════════════════════════════ */}
      <section className={styles.contact}>
        <div className={styles.contactGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.contactInner}>
            {/* Contact Info */}
            <motion.div
              className={styles.contactInfo}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <motion.span className={styles.contactLabel} variants={fadeUp}>
                Get In Touch
              </motion.span>

              <motion.h2 className={styles.contactTitle} variants={fadeUp}>
                Request a Quote
              </motion.h2>

              <motion.p className={styles.contactDesc} variants={fadeUp}>
                Interested in the <strong>{product.name}</strong>? Our team of
                engineers is ready to help you find the perfect crane solution
                for your facility. Fill out the form and we will get back to you
                within 24 hours.
              </motion.p>

              <motion.div className={styles.contactDetails} variants={fadeUp}>
                <div className={styles.contactDetail}>
                  <Phone size={18} className={styles.contactDetailIcon} />
                  <div>
                    <span className={styles.contactDetailLabel}>Phone</span>
                    <span className={styles.contactDetailValue}>
                      {company.phone[0]}
                    </span>
                  </div>
                </div>

                <div className={styles.contactDetail}>
                  <Mail size={18} className={styles.contactDetailIcon} />
                  <div>
                    <span className={styles.contactDetailLabel}>Email</span>
                    <span className={styles.contactDetailValue}>
                      {company.email}
                    </span>
                  </div>
                </div>

                <div className={styles.contactDetail}>
                  <MapPin size={18} className={styles.contactDetailIcon} />
                  <div>
                    <span className={styles.contactDetailLabel}>Location</span>
                    <span className={styles.contactDetailValue}>
                      {company.city}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className={styles.contactFormWrap}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
