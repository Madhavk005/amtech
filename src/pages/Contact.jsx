import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { company, images } from '../data/siteData';
import SectionHeader from '../components/ui/SectionHeader';
import ContactForm from '../components/ui/ContactForm';
import Button from '../components/ui/Button';
import {
  fadeUp,
  scaleIn,
  stagger,
  viewport,
} from '../utils/animations';
import SEO from '../components/ui/SEO';
import styles from './Contact.module.css';

/* Contact info cards data */
const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [company.address, company.landmark, company.city],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: company.phone,
    hrefs: company.phone.map((p) => `tel:${p.replace(/\s+/g, '')}`),
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: [company.email],
    hrefs: [`mailto:${company.email}`],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: [company.hours],
  },
];

/* Google Maps embed URL */
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.5!2d76.0100587!3d30.8821057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9e144f3aeb99%3A0x892fe5ea4ae66899!2sAmtech%20Projects%20And%20Products%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1711300000000';

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  return (
    <main className={styles.page}>
      <SEO 
        title="Contact Us | Get a Crane Quote" 
        description="Contact Amtech Cranes for engineering quotes, technical support, or to discuss your material handling project. Based in Ludhiana, Punjab, serving India."
        canonical="/contact"
      />
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={images.aboutMain || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'} alt="Amtech Cranes Contact" className={styles.heroBgImg} />
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
              <span>Contact</span>
            </nav>
            <h1 className={styles.heroTitle}>
              Let's Start a<br />Conversation
            </h1>
            <p className={styles.heroSubtitle}>
              Whether you need a quote, have a technical query, or want to
              discuss a project — we are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Info Cards (overlap hero) ─── */}
      <section className={styles.cardsSection}>
        <motion.div
          className={`${styles.container} ${styles.cardsGrid}`}
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                className={styles.infoCard}
                key={idx}
                variants={cardVariant}
              >
                <div className={styles.infoCardIcon}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className={styles.infoCardTitle}>{card.title}</h3>
                <div className={styles.infoCardLines}>
                  {card.lines.map((line, i) =>
                    card.hrefs && card.hrefs[i] ? (
                      <a
                        key={i}
                        href={card.hrefs[i]}
                        className={styles.infoCardLink}
                      >
                        {line}
                      </a>
                    ) : (
                      <span key={i} className={styles.infoCardLine}>
                        {line}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Form + Map ─── */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            {/* Left: Form */}
            <motion.div
              className={styles.formCol}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <SectionHeader
                label="Write to Us"
                title="Send Us Your Query"
                align="left"
              />
              <p className={styles.formIntro}>
                Fill out the form below and our team will get back to you within
                24 hours. We are here to help with any questions about our
                cranes, services, or custom requirements.
              </p>
              <ContactForm />
            </motion.div>

            {/* Right: Map */}
            <motion.div
              className={styles.mapCol}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <div className={styles.mapWrapper}>
                <iframe
                  className={styles.map}
                  src={MAPS_EMBED_URL}
                  title="Amtech Cranes Location - Ludhiana, Punjab"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Contact below map */}
              <div className={styles.quickContact}>
                <MessageCircle size={20} className={styles.quickContactIcon} />
                <div>
                  <h4 className={styles.quickContactTitle}>Quick Contact</h4>
                  <a
                    href={`tel:${company.phone[0].replace(/\s+/g, '')}`}
                    className={styles.quickContactLink}
                  >
                    {company.phone[0]}
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className={styles.quickContactLink}
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
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
            For emergency support and immediate assistance, reach out to us
            directly by phone or email.
          </p>
          <div className={styles.ctaButtons}>
            <Button
              as="a"
              href={`tel:${company.phone[0].replace(/\s+/g, '')}`}
              variant="primary"
              size="lg"
              icon={Phone}
            >
              {company.phone[0]}
            </Button>
            <Button
              as="a"
              href={`mailto:${company.email}`}
              variant="outline"
              size="lg"
              icon={Mail}
            >
              Send Email
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
