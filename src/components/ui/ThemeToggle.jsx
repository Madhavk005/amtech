import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import s from './ThemeToggle.module.css';

/**
 * @param {'icon' | 'switch'} mode - icon button or Light/Dark pill switch
 * @param {'default' | 'onDark' | 'mobile' | 'banner'} variant
 */
export default function ThemeToggle({
  mode = 'switch',
  variant = 'default',
  className = '',
}) {
  const { theme, setThemeMode, isDark } = useTheme();

  const variantClass =
    variant === 'onDark'
      ? s.toggleOnDark
      : variant === 'mobile'
        ? s.toggleMobile
        : variant === 'banner'
          ? s.toggleBanner
          : '';

  if (mode === 'icon') {
    return (
      <button
        type="button"
        className={`${s.toggle} ${variantClass} ${className}`.trim()}
        onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? (
          <Sun className={s.icon} aria-hidden="true" />
        ) : (
          <Moon className={s.icon} aria-hidden="true" />
        )}
        <span className="sr-only">
          {isDark ? 'Activate light mode' : 'Activate dark mode'}
        </span>
      </button>
    );
  }

  const switchClass = `${s.switch} ${variant === 'onDark' ? s.switchOnDark : ''} ${className}`.trim();
  const optionClass = (active) =>
    `${s.option} ${variant === 'onDark' ? s.optionOnDark : ''} ${active ? s.optionActive : ''}`.trim();

  return (
    <div
      className={switchClass}
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        className={optionClass(!isDark)}
        data-theme-option="light"
        onClick={() => setThemeMode('light')}
        aria-pressed={!isDark}
        title="Light mode"
      >
        <Sun aria-hidden="true" />
        <span>Light</span>
      </button>
      <button
        type="button"
        className={optionClass(isDark)}
        data-theme-option="dark"
        onClick={() => setThemeMode('dark')}
        aria-pressed={isDark}
        title="Dark mode"
      >
        <Moon aria-hidden="true" />
        <span>Dark</span>
      </button>
    </div>
  );
}
