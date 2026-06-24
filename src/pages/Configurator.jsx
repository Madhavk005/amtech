import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Cpu, 
  Settings, 
  Zap,
  Phone,
  Mail,
  Building2,
  User,
  Calendar
} from 'lucide-react';
import { craneTypes, dutyClasses, industries } from '../data/configuratorData';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';
import styles from './Configurator.module.css';

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState({
    typeId: null,
    loadCapacity: 5,
    spanLength: 10,
    liftHeight: 6,
    dutyClass: 'm5',
    environment: 'indoor',
    industry: '',
    powerSupply: '415V/50Hz/3Ph',
    name: '',
    company: '',
    email: '',
    phone: '',
    timeline: '3-6 months'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update URL hash for steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    let type = 'single-girder';
    if (config.environment === 'outdoor') {
      type = 'goliath';
    } else if (config.loadCapacity > 20 || config.spanLength > 20) {
      type = 'double-girder';
    } else if (config.loadCapacity <= 10 && config.industry === 'Manufacturing') {
      type = 'single-girder';
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig(prev => {
      if (prev.typeId === type) return prev;
      return { ...prev, typeId: type };
    });
  }, [config.loadCapacity, config.spanLength, config.environment, config.industry]);

  const selectedType = craneTypes.find(t => t.id === config.typeId);
  const selectedDuty = dutyClasses.find(d => d.id === config.dutyClass);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const stepLabels = ['Technical', 'Analysis', 'Summary', 'Connect'];

  return (
    <main className={styles.configuratorPage}>
      <SEO 
        title="Crane Configurator | Build Your Custom Lift" 
        description="Use our interactive crane configurator to design the perfect EOT or gantry crane for your industrial needs. Get a custom technical specification instantly."
        canonical="/configurator"
      />
      <div className="spotlight-layer" />
      
      <div className={`${styles.configuratorContainer} container`}>
        {/* Progress Stepper */}
        {!isSubmitted && (
          <div className={styles.stepper}>
            <div 
              className={styles.stepperProgress} 
              style={{ width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100}%` }}
            />
            {stepLabels.map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;
              
              return (
                <div key={label} className={`${styles.step} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepCompleted : ''}`}>
                  <div className={styles.stepDot}>
                    {isCompleted ? <CheckCircle2 size={18} strokeWidth={3} /> : stepNum}
                  </div>
                  <span className={styles.stepLabel}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successMessage}
            >
              <CheckCircle2 size={64} className={styles.successIcon} />
              <h2 className={styles.stepTitle}>Configuration Transmitted</h2>
              <p className={styles.stepSubtitle}>
                Our engineering team has received your technical specifications for the {selectedType?.name}. 
                An industrial lead will review your requirements and reach out within 24 hours.
              </p>
              <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <Button to="/" variant="primary">Return Home</Button>
                <Button to="/products" variant="outline">View All Products</Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={styles.stepContent}
            >


              {/* STEP 1: TECHNICAL INPUTS */}
              {currentStep === 1 && (
                <>
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Technical Parameters</h2>
                    <p className={styles.stepSubtitle}>Define the core engineering specifications for your crane.</p>
                  </div>

                  <div className={styles.inputGrid}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Load Capacity <span>(Safe Working Load)</span>
                        <span className={styles.labelValue}>{config.loadCapacity} Tons</span>
                      </label>
                      <input 
                        type="range" min="5" max="200" step="5" 
                        value={config.loadCapacity} 
                        onChange={(e) => handleConfigChange('loadCapacity', parseInt(e.target.value))}
                        className={styles.rangeInput}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Span Length <span>(Center to Center)</span>
                        <span className={styles.labelValue}>{config.spanLength} Meters</span>
                      </label>
                      <input 
                        type="range" min="5" max="60" step="0.5" 
                        value={config.spanLength} 
                        onChange={(e) => handleConfigChange('spanLength', parseFloat(e.target.value))}
                        className={styles.rangeInput}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Lift Height
                        <span className={styles.labelValue}>{config.liftHeight} Meters</span>
                      </label>
                      <input 
                        type="range" min="3" max="30" step="0.5" 
                        value={config.liftHeight} 
                        onChange={(e) => handleConfigChange('liftHeight', parseFloat(e.target.value))}
                        className={styles.rangeInput}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Duty Class (IS-3177)</label>
                      <select 
                        className={styles.selectInput}
                        value={config.dutyClass}
                        onChange={(e) => handleConfigChange('dutyClass', e.target.value)}
                      >
                        {dutyClasses.map(dc => (
                          <option key={dc.id} value={dc.id}>{dc.name} — {dc.desc}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Operational Environment</label>
                      <div className={styles.radioGroup}>
                        <label className={`${styles.radioLabel} ${config.environment === 'indoor' ? styles.radioLabelActive : ''}`}>
                          <input type="radio" name="env" checked={config.environment === 'indoor'} onChange={() => handleConfigChange('environment', 'indoor')} className={styles.radioInput} />
                          Indoor
                        </label>
                        <label className={`${styles.radioLabel} ${config.environment === 'outdoor' ? styles.radioLabelActive : ''}`}>
                          <input type="radio" name="env" checked={config.environment === 'outdoor'} onChange={() => handleConfigChange('environment', 'outdoor')} className={styles.radioInput} />
                          Outdoor
                        </label>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>Target Industry</label>
                      <select 
                        className={styles.selectInput}
                        value={config.industry}
                        onChange={(e) => handleConfigChange('industry', e.target.value)}
                      >
                        <option value="">Select Industry</option>
                        {industries.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: SMART ANALYSIS */}
              {currentStep === 2 && (
                <>
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Engineering Analysis</h2>
                    <p className={styles.stepSubtitle}>Our algorithm is processing your configuration against industrial standards.</p>
                  </div>

                  <div className={styles.summaryBento}>
                    <div className={styles.bentoMain}>
                      <h3 className={styles.bentoTitle}>System Recommendation</h3>
                      <div className={styles.specList}>
                        <div className={styles.specItem}>
                          <Settings className={styles.specIcon} size={22} />
                          <div>
                            <span className={styles.specLabel}>Optimal Configuration</span>
                            <span className={styles.specValue}>
                              {selectedType?.name || 'Custom Engineering Required'}
                            </span>
                          </div>
                        </div>
                        <div className={styles.specItem}>
                          <Cpu className={styles.specIcon} size={22} />
                          <div>
                            <span className={styles.specLabel}>Mechanism Selection</span>
                            <span className={styles.specValue}>High-Precision Modular Wire Rope Hoist</span>
                          </div>
                        </div>
                        <div className={styles.specItem}>
                          <Zap className={styles.specIcon} size={22} />
                          <div>
                            <span className={styles.specLabel}>Drive Control</span>
                            <span className={styles.specValue}>VFD Stepless Speed Control System</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.bentoStat}>
                      <span className={styles.bentoLabel}>Safety Factor</span>
                      <span className={styles.bentoValue}>5.0<span>:1</span></span>
                    </div>

                    <div className={styles.bentoStat}>
                      <span className={styles.bentoLabel}>Est. Structural Weight</span>
                      <span className={styles.bentoValue}>{((config.spanLength * 0.25) + (config.loadCapacity * 0.12)).toFixed(1)}<span> Tons</span></span>
                    </div>


                  </div>
                </>
              )}

              {/* STEP 3: VISUAL SUMMARY */}
              {currentStep === 3 && (
                <>
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Configuration Summary</h2>
                    <p className={styles.stepSubtitle}>Review your technical brief before final transmission.</p>
                  </div>

                  <div className={styles.summaryGrid}>
                    <div style={{ background: 'var(--secondary-light)', padding: '25px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-800)' }}>
                      <div className={styles.summaryBentoHeader}>
                        <h3 className={styles.cardTitle}>{selectedType?.name}</h3>
                        <span className={styles.capacityBadge}>Technical Brief</span>
                      </div>
                      
                      <div className={styles.specList}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className={styles.specLabel}>Load Capacity</span>
                            <span className={styles.specValue}>{config.loadCapacity} Tons</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className={styles.specLabel}>Span / Lift</span>
                            <span className={styles.specValue}>{config.spanLength}m / {config.liftHeight}m</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className={styles.specLabel}>Duty Cycle</span>
                            <span className={styles.specValue}>{selectedDuty?.name || config.dutyClass.toUpperCase()}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className={styles.specLabel}>Environment</span>
                            <span className={styles.specValue}>{config.environment === 'indoor' ? 'Indoor Operations' : 'Outdoor Operations'}</span>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </>
              )}

              {/* STEP 4: LEAD CAPTURE */}
              {currentStep === 4 && (
                <>
                  <div className={styles.stepHeader}>
                    <h2 className={styles.stepTitle}>Request Detailed Proposal</h2>
                    <p className={styles.stepSubtitle}>Connect with our engineering leads to finalize your technical specifications and quotation.</p>
                  </div>

                  <form className={styles.leadForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><User size={14} /> Full Name</label>
                      <input 
                        required type="text" className={styles.formInput} placeholder="e.g. John Doe"
                        value={config.name} onChange={(e) => handleConfigChange('name', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><Building2 size={14} /> Company Name</label>
                      <input 
                        required type="text" className={styles.formInput} placeholder="e.g. Reliance Industries"
                        value={config.company} onChange={(e) => handleConfigChange('company', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><Mail size={14} /> Work Email</label>
                      <input 
                        required type="email" className={styles.formInput} placeholder="john@company.com"
                        value={config.email} onChange={(e) => handleConfigChange('email', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}><Phone size={14} /> Contact Number</label>
                      <input 
                        required type="tel" className={styles.formInput} placeholder="+91 XXXX-XXXXXX"
                        value={config.phone} onChange={(e) => handleConfigChange('phone', e.target.value)}
                      />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.formFull}`}>
                      <label className={styles.inputLabel}><Calendar size={14} /> Expected Project Timeline</label>
                      <select 
                        className={styles.selectInput}
                        value={config.timeline} onChange={(e) => handleConfigChange('timeline', e.target.value)}
                      >
                        <option value="Immediate">Immediate Requirement (0-1 Month)</option>
                        <option value="Short Term">Short Term (1-3 Months)</option>
                        <option value="Medium Term">Medium Term (3-6 Months)</option>
                        <option value="Planning">Budgetary Planning Phase</option>
                      </select>
                    </div>

                    <div className={`${styles.stepFooter} ${styles.formFull}`}>
                      <Button type="button" variant="outline" onClick={prevStep}>Back to Summary</Button>
                      <Button type="submit" variant="primary" size="lg" arrow>Transmit Specification</Button>
                    </div>
                  </form>
                </>
              )}

              {/* Navigation buttons for Step 1-3 */}
              {currentStep < 4 && (
                <div className={styles.stepFooter}>
                  <Button 
                    variant="ghost" 
                    onClick={prevStep} 
                    disabled={currentStep === 1}
                    style={{ opacity: currentStep === 1 ? 0 : 1, pointerEvents: currentStep === 1 ? 'none' : 'auto' }}
                    icon={ChevronLeft}
                  >
                    Previous
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    onClick={nextStep}
                    icon={ChevronRight}
                    iconRight
                  >
                    {currentStep === 3 ? 'Confirm & Connect' : 'Next Step'}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
