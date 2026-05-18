import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { services, company } from '../data/siteData';
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

const rowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const expandVariant = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, delay: 0.1 } },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.3, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.15 } },
  },
};

export default function Services() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <main className={styles.page}>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <span className={styles.watermark} aria-hidden="true">Services</span>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
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
      </section>

      {/* ─── Services Accordion List ─── */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <SectionHeader
            label="What We Offer"
            title="Our Service Portfolio"
            description="Eight specialized service verticals designed to keep your operations running at peak performance."
            align="left"
          />

          <motion.div
            className={styles.servicesList}
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon];
              const isExpanded = expandedId === service.id;
              const num = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={service.id}
                  className={`${styles.serviceRow} ${isExpanded ? styles.serviceRowActive : ''}`}
                  variants={rowVariant}
                  onClick={() => toggleExpand(service.id)}
                >
                  <div className={styles.serviceRowMain}>
                    <span className={styles.serviceNum}>{num}</span>
                    <div className={styles.serviceIconCircle}>
                      {IconComponent && <IconComponent size={20} strokeWidth={1.8} />}
                    </div>
                    <div className={styles.serviceInfo}>
                      <h3 className={styles.serviceName}>{service.name}</h3>
                      <p className={styles.serviceDesc}>{service.desc}</p>
                    </div>
                    <span className={styles.serviceArrow}>
                      <ArrowRight size={18} strokeWidth={2} />
                    </span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className={styles.serviceExpanded}
                        variants={expandVariant}
                        initial="collapsed"
                        animate="expanded"
                        exit="exit"
                      >
                        <div className={styles.serviceExpandedInner}>
                          <p className={styles.serviceExpandedText}>
                            {service.desc} Our dedicated team ensures minimal downtime
                            and maximum equipment reliability through proven methodologies
                            and industry-leading practices.
                          </p>
                          <Button variant="ghost" to="/contact" size="sm" arrow>
                            Get a Quote
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Why Choose Our Service ─── */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <SectionHeader
            label="Our Strengths"
            title="Why Choose Our Service"
            align="center"
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
