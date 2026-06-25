import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, ChevronDown } from 'lucide-react';
import Button from './Button';
import { submitContactForm } from '../../services/api';
import styles from './ContactForm.module.css';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'EOT Cranes',
  'Gantry Cranes',
  'Jib Cranes',
  'Hoists & Lifts',
  'Annual Maintenance',
  'Spare Parts',
  'Other',
];

const initialState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const initialErrors = { ...initialState };

function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (fields.phone && !/^[+\d\s()-]{7,20}$/.test(fields.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!fields.subject) {
    errors.subject = 'Please select a subject.';
  }

  if (!fields.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

/* Shake animation for form-level error */
const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

/* Success card animation */
const successVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function ContactForm({ className = '', onSubmit }) {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validate(fields);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || '' }));
    },
    [fields]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = validate(fields);
    setErrors(fieldErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (Object.keys(fieldErrors).length > 0) {
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return;
    }

    setSending(true);

    try {
      if (onSubmit) {
        await onSubmit(fields);
      } else {
        await submitContactForm(fields);
      }
      setSubmitted(true);
      setFields(initialState);
      setTouched({});
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message || 'Failed to send message.' }));
    } finally {
      setSending(false);
    }
  };

  const fieldHasError = (name) => touched[name] && errors[name];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className={styles.success}
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.successIcon}>
              <Check size={28} strokeWidth={2.5} />
            </div>
            <h3 className={styles.successTitle}>Message Sent</h3>
            <p className={styles.successText}>
              Thank you for reaching out. Our team will get back to you within
              24 hours.
            </p>
            <Button
              variant="outline"
              size="md"
              pill={false}
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            variants={shakeVariants}
            animate={shaking ? 'shake' : 'idle'}
          >
            {/* Row: Name + Email */}
            <div className={styles.row}>
              <div
                className={`${styles.field} ${fieldHasError('name') ? styles.fieldError : ''}`}
              >
                <div className={styles.inputWrap}>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    placeholder=" "
                    className={styles.input}
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                  />
                  <label htmlFor="cf-name" className={styles.label}>
                    Name <span className={styles.required}>*</span>
                  </label>
                  <span className={styles.focusLine} />
                </div>
                {fieldHasError('name') && (
                  <motion.span
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.name}
                  </motion.span>
                )}
              </div>

              <div
                className={`${styles.field} ${fieldHasError('email') ? styles.fieldError : ''}`}
              >
                <div className={styles.inputWrap}>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    placeholder=" "
                    className={styles.input}
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                  />
                  <label htmlFor="cf-email" className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <span className={styles.focusLine} />
                </div>
                {fieldHasError('email') && (
                  <motion.span
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Row: Phone + Subject */}
            <div className={styles.row}>
              <div
                className={`${styles.field} ${fieldHasError('phone') ? styles.fieldError : ''}`}
              >
                <div className={styles.inputWrap}>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    placeholder=" "
                    className={styles.input}
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="tel"
                  />
                  <label htmlFor="cf-phone" className={styles.label}>
                    Phone
                  </label>
                  <span className={styles.focusLine} />
                </div>
                {fieldHasError('phone') && (
                  <motion.span
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.phone}
                  </motion.span>
                )}
              </div>

              <div
                className={`${styles.field} ${fieldHasError('subject') ? styles.fieldError : ''}`}
              >
                <div className={styles.inputWrap}>
                  <select
                    id="cf-subject"
                    name="subject"
                    className={`${styles.select} ${!fields.subject ? styles.selectEmpty : ''}`}
                    value={fields.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>
                      {' '}
                    </option>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="cf-subject" className={styles.label}>
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <ChevronDown
                    size={16}
                    className={styles.selectChevron}
                    strokeWidth={2}
                  />
                  <span className={styles.focusLine} />
                </div>
                {fieldHasError('subject') && (
                  <motion.span
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.subject}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Message */}
            <div
              className={`${styles.field} ${fieldHasError('message') ? styles.fieldError : ''}`}
            >
              <div className={styles.inputWrap}>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder=" "
                  className={styles.textarea}
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                />
                <label htmlFor="cf-message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <span className={styles.focusLine} />
              </div>
              {fieldHasError('message') && (
                <motion.span
                  className={styles.error}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.message}
                </motion.span>
              )}
            </div>

            {/* Form Error */}
            {errors.submit && (
              <motion.div 
                className={styles.error}
                style={{ textAlign: 'center', marginBottom: '16px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Submit */}
            <div className={styles.actions}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                fullWidth
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
