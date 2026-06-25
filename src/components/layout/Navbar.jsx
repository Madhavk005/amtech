import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { navLinks, company } from "../../data/siteData";
import s from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeout = useRef(null);
  const location = useLocation();

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setExpandedMobile(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  /* ── Scroll detection ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Desktop dropdown hover handlers ── */
  const openDropdown = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  /* ── Mobile accordion toggle ── */
  const toggleMobileDropdown = (label) => {
    setExpandedMobile((prev) => (prev === label ? null : label));
  };

  /* ── Determine transparent state ── */
  const exactPaths = ['/', '/about', '/services', '/contact', '/products'];
  const isTransparentPage = exactPaths.includes(location.pathname);
  const isTransparent = isTransparentPage && !scrolled && !mobileOpen;

  return (
    <>
      {/* ── TOP BAR (STICKY ANNOUNCEMENT / CONTACT STRIP) ── */}
      <div className={s.topBar}>
        <div className={s.topBarInner}>
          <div className={s.topBarContact}>
            <a href={`tel:${company.phone[0].replace(/\s/g, "")}`} className={s.topContactLink}>
              <Phone size={14} />
              <span>{company.phone[0]}</span>
            </a>
            <span className={s.topBarSep}>|</span>
            <a href={`mailto:${company.salesEmail}`} className={s.topContactLink}>
              <Mail size={14} />
              <span>{company.salesEmail}</span>
            </a>
          </div>
          <div className={s.topBarCta}>
            <Link to="/contact" className={s.topBarPulseBtn}>
              <span className={s.pulseDot}></span>
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header
        className={`${s.header} ${scrolled ? s.scrolled : ""} ${isTransparent ? s.transparent : ""}`}
      >
        <div className={s.inner}>
          {/* Logo */}
          <div className={s.logoContainer}>
            <Link to="/" className={s.logo} aria-label="Amtech Cranes Home">
              <img
                src={company.logo}
                alt={company.fullName}
                className={`${s.logoImg} ${isTransparent ? s.logoWhite : s.logoColor}`}
              />
            </Link>
          </div>

          {/* Desktop Nav - centered */}
          <nav className={s.desktopNav} aria-label="Main navigation">
            {navLinks.map((item) => (
              <div
                key={item.label}
                className={s.navItem}
                onMouseEnter={() => item.children && openDropdown(item.label)}
                onMouseLeave={() => item.children && closeDropdown()}
              >
                {item.path === "#" ? (
                  <div className={`${s.navLink} ${isTransparent ? s.navLinkLight : ""}`} style={{ cursor: 'pointer' }}>
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        className={`${s.chevron} ${
                          activeDropdown === item.label ? s.chevronOpen : ""
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `${s.navLink} ${isActive ? s.navLinkActive : ""} ${isTransparent ? s.navLinkLight : ""}`
                    }
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        className={`${s.chevron} ${
                          activeDropdown === item.label ? s.chevronOpen : ""
                        }`}
                      />
                    )}
                  </NavLink>
                )}

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        className={s.dropdown}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => openDropdown(item.label)}
                        onMouseLeave={() => closeDropdown()}
                      >
                        <div className={s.dropdownInner}>
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={s.dropdownLink}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span>{child.label}</span>
                              <ArrowRight className={s.dropdownArrow} />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className={s.headerRight}>
            {/* Desktop CTA */}
            <Link
              to="/contact"
              className={`${s.cta} ${scrolled && !isTransparent ? s.ctaSolid : s.ctaOutline}`}
            >
              Get a Quote
              <ArrowRight size={15} />
            </Link>

            {/* Hamburger */}
            <button
              className={`${s.hamburger} ${mobileOpen ? s.hamburgerActive : ""}`}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`${s.bar} ${isTransparent && !mobileOpen ? s.barLight : ""}`} />
              <span className={`${s.bar} ${isTransparent && !mobileOpen ? s.barLight : ""}`} />
              <span className={`${s.bar} ${isTransparent && !mobileOpen ? s.barLight : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN OVERLAY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className={s.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            aria-label="Mobile navigation"
          >
            <div className={s.mobileHeader}>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img
                  src={company.logo}
                  alt={company.fullName}
                  className={`${s.mobileLogoImg} ${s.logoColor}`}
                />
              </Link>
              <div className={s.mobileHeaderActions}>
                <button
                  className={`${s.hamburger} ${s.hamburgerActive} ${s.hamburgerMobileClose}`}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <span className={s.bar} />
                  <span className={s.bar} />
                  <span className={s.bar} />
                </button>
              </div>
            </div>

            <div className={s.mobileNavList}>
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={s.mobileNavItem}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.children ? (
                    <>
                      <button
                        className={`${s.mobileNavLink} ${
                          expandedMobile === item.label ? s.mobileNavLinkActive : ""
                        }`}
                        onClick={() => toggleMobileDropdown(item.label)}
                        aria-expanded={expandedMobile === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`${s.mobileChevron} ${
                            expandedMobile === item.label ? s.mobileChevronOpen : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedMobile === item.label && (
                          <motion.div
                            className={s.mobileDropdown}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {item.path !== "#" && (
                              <Link
                                to={item.path}
                                className={s.mobileDropdownLink}
                                onClick={() => setMobileOpen(false)}
                              >
                                All {item.label}
                              </Link>
                            )}
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={s.mobileDropdownLink}
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`${s.mobileNavLink} ${
                        location.pathname === item.path ? s.mobileNavLinkActive : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className={s.mobileCta}>
              <Link
                to="/contact"
                className={s.mobileCtaBtn}
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className={s.mobileContact}>
              <a href={`tel:${company.phone[0].replace(/\s/g, "")}`} className={s.mobileContactItem}>
                <Phone size={14} />
                <span>{company.phone[0]}</span>
              </a>
              <a href={`mailto:${company.salesEmail}`} className={s.mobileContactItem}>
                <Mail size={16} />
                <span>{company.salesEmail}</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={s.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
