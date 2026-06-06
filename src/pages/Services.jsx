import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  HeartPulse,
  Wrench,
  RefreshCw,
  Hammer,
  Truck,
  CheckCircle,
  Package,
  Users,
  Zap,
  Globe,
  Phone,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { services, company, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import {
  fadeUp,
  stagger,
  scaleIn,
  viewport,
} from '../utils/animations';
import styles from './Services.module.css';

/* Map icon name strings to actual lucide components */
const iconMap = {
  FileCheck,
  HeartPulse,
  Wrench,
  RefreshCw,
  Hammer,
  Truck,
  CheckCircle,
  Package,
};

const whyChooseData = [
  {
    icon: Users,
    title: 'Expert Team',
    desc: 'Our highly trained technicians bring decades of combined experience in crane servicing, repair, and maintenance across all major industries.',
  },
  {
    icon: Zap,
    title: 'Fast Response',
    desc: 'We understand downtime costs money. Our rapid response system ensures your equipment issues are addressed promptly and efficiently.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    desc: 'With service operations spanning across India and beyond, we deliver consistent, reliable support wherever your facility is located.',
  },
];

export default function Services() {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={images.aboutMain || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'} alt="Amtech Cranes Services" className={styles.heroBgImg} />
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
              <Link to="/">Home</Link>
              <ChevronRight size={14} className={styles.breadcrumbSep} />
              <span>Services</span>
            </nav>
            <h1 className={styles.heroTitle}>
              Comprehensive<br />After-Sales Support
            </h1>
            <p className={styles.heroSubtitle}>
              Complete lifecycle support for your crane systems — from commissioning
              to maintenance, repairs, and modernization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Horizontal Accordion ─── */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <SectionHeader
            label="What We Offer"
            title="Our Service Portfolio"
            description="Eight specialized service verticals designed to keep your operations running at peak performance."
            align="left"
          />

          <div className={styles.horizontalAccordionContainer}>
            <div className={styles.horizontalAccordion}>
              {services.map((service, idx) => {
                const IconComponent = iconMap[service.icon];
                const num = String(idx + 1).padStart(2, '0');
                const isActive = activePanel === idx;
                
                return (
                  <div 
                    key={service.id} 
                    className={`${styles.panel} ${isActive ? styles.panelActive : ''}`}
                    onClick={() => setActivePanel(idx)}
                    onMouseEnter={() => setActivePanel(idx)}
                  >
                    <div className={styles.panelCollapsed}>
                      {IconComponent && <IconComponent size={24} strokeWidth={1.5} className={styles.panelIconCollapsed} />}
                      <span className={styles.panelNumCollapsed}>{num}</span>
                      <span className={styles.panelTitleCollapsed}>{service.name}</span>
                    </div>
                    
                    <div className={styles.panelExpanded}>
                      <div className={styles.panelExpandedInner}>
                        <div className={styles.panelHeader}>
                          {IconComponent && <IconComponent size={40} strokeWidth={1.5} className={styles.panelIconExpanded} />}
                          <span className={styles.panelNumExpanded}>{num}</span>
                        </div>
                        <h3 className={styles.panelTitleExpanded}>{service.name}</h3>
                        <p className={styles.panelDesc}>{service.desc}</p>
                        <Link to="/contact" className={styles.panelBtn}>
                          Inquire Now <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Our Service ─── */}
      <section className={styles.whySection}>
        <div className={styles.whyGlow} aria-hidden="true" />
        <div className={styles.container}>
          <SectionHeader
            label="Our Strengths"
            title="Why Choose Our Service"
            align="center"
            light
          />
          <motion.div
            className={styles.whyGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {whyChooseData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className={styles.whyCard}
                  variants={scaleIn}
                >
                  <div className={styles.whyIconWrap}>
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <motion.div
          className={styles.ctaInner}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <h2 className={styles.ctaTitle}>Need Urgent Support?</h2>
          <p className={styles.ctaText}>
            Our service team is available for emergency support. Reach out now and
            we will have an expert on your case within hours.
          </p>
          <a
            href={`tel:${company.phone[0].replace(/\s/g, '')}`}
            className={styles.ctaPhone}
          >
            <Phone size={22} strokeWidth={2} />
            <span>{company.phone[0]}</span>
          </a>
          <div className={styles.ctaActions}>
            <Button variant="white" to="/contact" size="lg" arrow>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
