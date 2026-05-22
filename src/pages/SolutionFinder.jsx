import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Warehouse, 
  Factory, 
  Building2, 
  Anchor, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Wrench
} from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import styles from './SolutionFinder.module.css';

const STEPS = [
  {
    id: 'industry',
    title: 'Select Your Industry',
    subtitle: 'We tailor our engineering to your specific sector environment.',
    options: [
      { id: 'steel', label: 'Steel & Metallurgy', icon: Factory, desc: 'Heat-resistant, high-duty cycle cranes.' },
      { id: 'power', label: 'Power Generation', icon: Zap, desc: 'Precision lifting for turbines and maintenance.' },
      { id: 'mfg', label: 'General Manufacturing', icon: Building2, desc: 'Versatile EOT solutions for production lines.' },
      { id: 'warehousing', label: 'Warehousing & Logistics', icon: Warehouse, desc: 'Fast, efficient storage handling.' },
      { id: 'infra', label: 'Infrastructure & Port', icon: Anchor, desc: 'Heavy-duty gantry and yard cranes.' },
    ]
  },
  {
    id: 'application',
    title: 'What is the Primary Use?',
    subtitle: 'Understanding the workload helps us define the duty class.',
    options: [
      { id: 'assembly', label: 'Assembly Line', icon: Wrench, desc: 'Frequent, precise movements.' },
      { id: 'storage', label: 'Material Storage', icon: Warehouse, desc: 'High stacking and bulk movement.' },
      { id: 'maintenance', label: 'Plant Maintenance', icon: HelpCircle, desc: 'Occasional but critical lifting.' },
      { id: 'outdoor', label: 'Outdoor Yard', icon: Factory, desc: 'Weatherproof gantry systems.' },
    ]
  }
];

const RECOMMENDATIONS = {
  'steel-assembly': {
    title: 'Double Girder EOT Crane (M8 Duty)',
    desc: 'Engineered for extreme heat and 24/7 scrap handling or ladle transport.',
    features: ['Heat Shields', 'Redundant Braking', 'Cabin Control'],
    image: '/images/configurator/double-girder.png'
  },
  'mfg-assembly': {
    title: 'Single Girder EOT Crane',
    desc: 'Cost-effective, compact solution for standard production workshops.',
    features: ['Low Headroom', 'Inverter Control', 'Easy Maintenance'],
    image: '/images/configurator/single-girder.png'
  },
  'warehousing-storage': {
    title: 'Underslung / Monorail System',
    desc: 'Maximizes floor space by utilizing the roof structure directly.',
    features: ['Space Optimization', 'Modular Design', 'Remote Ops'],
    image: '/images/configurator/underslung.png'
  },
  'infra-outdoor': {
    title: 'Gantry / Goliath Crane',
    desc: 'Independent structure for yard operations without building columns.',
    features: ['Anti-Sway System', 'Storm Anchors', 'Dual Speed'],
    image: '/images/configurator/goliath.png'
  }
};

export default function SolutionFinder() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id) => {
    const newSelections = { ...selections, [STEPS[step].id]: id };
    setSelections(newSelections);

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setSelections({});
    setShowResult(false);
  };

  const recommendation = showResult ? 
    (RECOMMENDATIONS[`${selections.industry}-${selections.application}`] || RECOMMENDATIONS['mfg-assembly']) : null;

  return (
    <div className={styles.container}>
      <SEO 
        title="Crane Solution Finder | Recommendation Engine" 
        description="Not sure which crane is right for you? Answer a few questions about your industry and application, and our engine will recommend the perfect material handling solution."
        canonical="/solution-finder"
      />
      <header className={styles.header}>
        <div className={styles.badge}>Guided Finder</div>
        <h1 className={styles.title}>Find Your <span className={styles.accent}>Perfect Crane</span></h1>
        <p className={styles.subtitle}>Answer 2 questions and our engine will recommend the optimal material handling system.</p>
      </header>

      <div className={styles.finderCard}>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={styles.stepContent}
            >
              <div className={styles.stepHeader}>
                <span className={styles.stepNum}>Step {step + 1} of 2</span>
                <h2>{STEPS[step].title}</h2>
                <p>{STEPS[step].subtitle}</p>
              </div>

              <div className={styles.optionsGrid}>
                {STEPS[step].options.map((opt) => (
                  <button 
                    key={opt.id} 
                    className={styles.optionBtn}
                    onClick={() => handleSelect(opt.id)}
                  >
                    <div className={styles.optIcon}>
                      <opt.icon size={24} />
                    </div>
                    <div className={styles.optText}>
                      <span className={styles.optLabel}>{opt.label}</span>
                      <span className={styles.optDesc}>{opt.desc}</span>
                    </div>
                    <ArrowRight className={styles.arrow} size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.resultView}
            >
              <div className={styles.resultBadge}>Optimal Recommendation</div>
              <div className={styles.resultGrid}>
                <div className={styles.resultInfo}>
                  <h2 className={styles.recTitle}>{recommendation.title}</h2>
                  <p className={styles.recDesc}>{recommendation.desc}</p>
                  
                  <div className={styles.featureList}>
                    {recommendation.features.map(f => (
                      <div key={f} className={styles.featureItem}>
                        <CheckCircle2 size={16} className={styles.checkIcon} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <Button to="/configurator" variant="primary" size="lg" arrow>Configure This Crane</Button>
                    <button className={styles.resetBtn} onClick={reset}>Start Over</button>
                  </div>
                </div>
                <div className={styles.resultVisual}>
                  <img src={recommendation.image} alt={recommendation.title} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
