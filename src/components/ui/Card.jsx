import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './Card.module.css';

export default function Card({
  image,
  title,
  description,
  link,
  linkText = 'Learn More',
  tag,
  variant = 'default',
  className = '',
  ...props
}) {
  const Wrapper = link ? Link : 'div';
  const wrapperProps = link ? { to: link } : {};

  const classes = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  /* ---- Overlay variant ---- */
  if (variant === 'overlay') {
    return (
      <Wrapper className={classes} {...wrapperProps} {...props}>
        {image && (
          <div className={styles.overlayImageWrap}>
            <img
              src={image}
              alt={title || ''}
              className={styles.overlayImage}
              loading="lazy"
            />
            <div className={styles.overlayGradient} />
          </div>
        )}
        {tag && <span className={styles.overlayTag}>{tag}</span>}
        <div className={styles.overlayContent}>
          {title && <h3 className={styles.overlayTitle}>{title}</h3>}
          {description && (
            <p className={styles.overlayDescription}>{description}</p>
          )}
          {link && (
            <span className={styles.overlayLink}>
              {linkText}
              <ChevronRight size={16} className={styles.chevron} />
            </span>
          )}
        </div>
      </Wrapper>
    );
  }

  /* ---- Minimal variant ---- */
  if (variant === 'minimal') {
    return (
      <Wrapper className={classes} {...wrapperProps} {...props}>
        <div className={styles.minimalContent}>
          {tag && <span className={styles.minimalTag}>{tag}</span>}
          {title && <h3 className={styles.minimalTitle}>{title}</h3>}
          {description && (
            <p className={styles.minimalDescription}>{description}</p>
          )}
        </div>
        <ChevronRight size={20} className={styles.minimalArrow} />
      </Wrapper>
    );
  }

  /* ---- Default variant ---- */
  return (
    <Wrapper className={classes} {...wrapperProps} {...props}>
      {image && (
        <div className={styles.imageWrap}>
          <img
            src={image}
            alt={title || ''}
            className={styles.image}
            loading="lazy"
          />
          {tag && <span className={styles.tag}>{tag}</span>}
        </div>
      )}

      <div className={styles.content}>
        {!image && tag && <span className={styles.tagInline}>{tag}</span>}
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        {link && (
          <span className={styles.link}>
            {linkText}
            <ChevronRight size={15} className={styles.chevron} />
          </span>
        )}
      </div>
    </Wrapper>
  );
}
