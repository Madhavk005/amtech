import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { company } from '../../data/siteData';
import ThemeToggle from '../ui/ThemeToggle';
import s from './TopBanner.module.css';

const TopBanner = () => {
  return (
    <div className={s.topBanner}>
      <div className={s.inner}>
        <div className={s.left}>
          <a href={`tel:${company.phone[0]}`} className={`${s.contactItem} ${s.flash}`}>
            <Phone size={14} className={s.icon} />
            <span>{company.phone[0]}</span>
          </a>
          <a href={`tel:${company.phone[1]}`} className={s.contactItem}>
            <Phone size={14} className={s.icon} />
            <span className={s.hideMobile}>{company.phone[1]}</span>
          </a>
          <a href={`mailto:${company.email}`} className={s.contactItem}>
            <Mail size={14} className={s.icon} />
            <span className={s.hideMobile}>{company.email}</span>
          </a>
        </div>
        
        <div className={s.right}>
          <ThemeToggle mode="switch" variant="banner" className={s.themeToggle} />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
