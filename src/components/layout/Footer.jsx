import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { company, products } from "../../data/siteData";
import { fadeUp, stagger, viewport } from "../../utils/animations";
import s from "./Footer.module.css";

/* ── Derive footer link sets from siteData ── */
const companyLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Manufacturing", path: "/manufacturing" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const excludedFooterProductIds = [
  "ladle-handling-cranes",
  "scrap-handling-cranes",
  "billet-handling-cranes",
  "plate-coil-handling-cranes",
  "rolling-mill-cranes",
  "ladle-transfer-trolleys"
];

const productLinks = products
  .filter((p) => !excludedFooterProductIds.includes(p.id))
  .map((p) => ({
    label: p.name,
    path: `/products/${p.id}`,
  }));

const socials = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      {/* ── AMTECH WATERMARK ── */}
      <div className={s.watermark}>AMTECH</div>
      
      {/* ── CTA STRIP ── */}
      <div className={s.ctaSection}>
        <div className={s.ctaContainer}>
          <motion.div
            className={s.ctaCard}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className={s.ctaContent}>
              <h3 className={s.ctaTitle}>Ready to discuss your project?</h3>
              <p className={s.ctaDesc}>
                Let our engineering team design the perfect crane solution for
                your facility.
              </p>
            </div>
            <div className={s.ctaActions}>
              <Link to="/contact" className={s.ctaBtn}>
                Let&rsquo;s Talk
                <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${company.phone[0].replace(/\s/g, "")}`}
                className={s.ctaPhone}
              >
                <Phone size={16} />
                {company.phone[0]}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className={s.main}>
        <motion.div
          className={s.grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {/* Col 1 — Brand */}
          <motion.div className={s.brandCol} variants={fadeUp}>
            <Link to="/" className={s.footerLogoLink}>
              <img
                src={company.logo}
                alt={company.fullName}
                className={s.footerLogo}
              />
            </Link>
            <p className={s.tagline}>
              Engineering excellence since 1990.
              <br />
              Trusted across industries worldwide.
            </p>
            <div className={s.socials}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.socialIcon}
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Company */}
          <motion.div variants={fadeUp}>
            <h4 className={s.colTitle}>Company</h4>
            <ul className={s.linkList}>
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={s.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Products */}
          <motion.div variants={fadeUp}>
            <h4 className={s.colTitle}>Products</h4>
            <ul className={s.linkList}>
              {productLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={s.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={fadeUp}>
            <h4 className={s.colTitle}>Get In Touch</h4>
            <div className={s.contactList}>
              <div className={s.contactItem}>
                <MapPin size={16} className={s.contactIcon} />
                <span>
                  {company.address}
                  <br />
                  {company.city}
                </span>
              </div>
              <div className={s.contactItem}>
                <Phone size={16} className={s.contactIcon} />
                <div>
                  <a href={`tel:${company.phone[0].replace(/\s/g, "")}`}>
                    {company.phone[0]}
                  </a>
                  <br />
                  <a href={`tel:${company.phone[1].replace(/\s/g, "")}`}>
                    {company.phone[1]}
                  </a>
                </div>
              </div>
              <div className={s.contactItem}>
                <Mail size={16} className={s.contactIcon} />
                <div>
                  <a href={`mailto:${company.salesEmail}`}>Sales: {company.salesEmail}</a>
                  <br />
                  <a href={`mailto:${company.serviceEmail}`}>Service: {company.serviceEmail}</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={s.bottomBar}>
        <div className={s.bottomInner}>
          <p className={s.copyright}>
            &copy; {new Date().getFullYear()} {company.fullName}. All rights reserved.
          </p>
          <p className={s.engineered}>Designed by <a href="https://atalixmedia.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>Atalix Media</a></p>
        </div>
      </div>
    </footer>
  );
}
