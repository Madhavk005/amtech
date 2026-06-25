import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { industries } from '../data/siteData';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import { fadeUp, viewport } from '../utils/animations';
import ContactForm from '../components/ui/ContactForm';
import styles from './SteelPlantCranes.module.css';

export default function SteelPlantCranes() {
  const steelPlantData = industries.find(ind => ind.id === 'steel-plants');
  const solutions = steelPlantData?.solutions || [];

  return (
    <main className={styles.page} id="main-content">
      <SEO 
        title="Steel Plant Cranes & Material Handling | Amtech Cranes" 
        description="Explore our specialized range of high-performance cranes designed specifically for steel plants, foundries, and extreme industrial environments." 
      />
      
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link to="/products">Equipment</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">Steel Plant Cranes</span>
            </nav>
            <h1 id="hero-title" className={styles.heroTitle}>Steel Plant Cranes</h1>
            <p className={styles.heroSubtitle}>
              Engineered for extreme temperatures, high continuous-duty cycles, and the most demanding material handling environments in modern steelmaking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <section className={styles.mainSection}>
        <div className={styles.layoutContainer}>
          {/* Sidebar Navigation */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <h2 className={styles.sidebarTitle}>Cranes & Solutions</h2>
              <ul className={styles.sidebarNav}>
                {solutions.map((solution) => (
                  <li key={`nav-${solution.id}`}>
                    <a href={`#${solution.id}`} className={styles.sidebarLink}>
                      {solution.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {solutions.map((solution) => (
              <motion.section 
                key={solution.id} 
                id={solution.id}
                className={styles.productRow}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={styles.productVisual}>
                  <img src={solution.image} alt={solution.title} className={styles.productImage} loading="lazy" />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.productTitle}>{solution.title}</h2>
                  <p className={styles.productDesc}>{solution.desc}</p>
                  <Button 
                    variant="outline" 
                    to={solution.link} 
                    className={styles.productButton} 
                    arrow
                    aria-label={`Learn more about ${solution.title}`}
                  >
                    View Product Details
                  </Button>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Inquiry Form */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.container}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--glass-bg)', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)' }}>
            <motion.div
              className={styles.ctaInner}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              style={{ textAlign: 'center', marginBottom: '30px' }}
            >
              <h2 id="cta-title" className={styles.ctaTitle}>Need a Custom Solution?</h2>
              <p className={styles.ctaText}>
                Contact our engineering team to design a crane tailored to your specific foundry or steel plant requirements.
              </p>
            </motion.div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
