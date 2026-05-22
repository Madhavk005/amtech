import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      as,
      to,
      href,
      icon: Icon,
      iconRight,
      arrow,
      disabled = false,
      fullWidth = false,
      pill,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    /* Pill shape: default for primary/secondary/white; standard for outline/ghost */
    const isPill =
      pill !== undefined
        ? pill
        : variant === 'primary' ||
          variant === 'secondary' ||
          variant === 'white';

    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      isPill ? styles.pill : styles.standard,
      fullWidth ? styles.fullWidth : '',
      disabled ? styles.disabled : '',
      arrow ? styles.hasArrow : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSize = size === 'sm' ? 15 : size === 'lg' ? 20 : 17;

    const content = (
      <>
        {Icon && !iconRight && (
          <Icon className={styles.icon} size={iconSize} strokeWidth={2} />
        )}
        {children && <span className={styles.label}>{children}</span>}
        {Icon && iconRight && (
          <Icon className={styles.iconRight} size={iconSize} strokeWidth={2} />
        )}
        {arrow && (
          <ArrowRight
            className={styles.arrow}
            size={iconSize}
            strokeWidth={2}
          />
        )}
        {/* Ghost underline element */}
        {variant === 'ghost' && (
          <span className={styles.underline} aria-hidden="true" />
        )}
      </>
    );

    /* Render as react-router Link */
    if (as === Link || as === 'Link' || (to && !as)) {
      return (
        <Link ref={ref} to={to} className={classes} {...props}>
          {content}
        </Link>
      );
    }

    /* Render as external anchor */
    if (as === 'a' || href) {
      return (
        <a
          ref={ref}
          href={href || to}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      );
    }

    /* Default: render as button */
    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
