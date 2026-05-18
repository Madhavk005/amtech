import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw,
  Zap,
  DollarSign,
  Info
} from 'lucide-react';
import Button from '../components/ui/Button';
import styles from './ROICalculator.module.css';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    currentMethod: 'old-crane', // 'manual', 'old-crane'
    liftingFrequency: 20, // lifts per day
    avgLoadWeight: 5, // tons
    downtimeHoursPerMonth: 8,
    laborRate: 500, // per hour (approx for crew)
    craneCost: 1500000, // INR 15 Lakhs approx
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'currentMethod' ? value : parseFloat(value) || 0
    }));
  };

  const results = useMemo(() => {
    // Basic logic for ROI
    const yearlyDowntimeCost = inputs.downtimeHoursPerMonth * 12 * inputs.laborRate;
    const maintenanceSaving = inputs.currentMethod === 'old-crane' ? 50000 : 0; // Fixed avg saving
    const efficiencyGain = (inputs.liftingFrequency * 300 * 0.2) * (inputs.laborRate / 10); // 20% faster, 300 days
    
    const totalYearlySaving = yearlyDowntimeCost + maintenanceSaving + efficiencyGain;
    const paybackMonths = (inputs.craneCost / (totalYearlySaving / 12)).toFixed(1);
    const fiveYearROI = ((totalYearlySaving * 5) - inputs.craneCost).toLocaleString('en-IN');

    return {
      yearlySaving: totalYearlySaving.toLocaleString('en-IN'),
      paybackMonths,
      fiveYearROI,
      efficiencyPercentage: '25%',
    };
  }, [inputs]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.headerContent}
        >
          <div className={styles.badge}>
            <TrendingUp size={14} />
            <span>Investment Analysis</span>
          </div>
          <h1 className={styles.title}>Crane ROI <span className={styles.accent}>Calculator</span></h1>
          <p className={styles.subtitle}>
            Quantify the financial impact of upgrading to Amtech Precision Engineering.
          </p>
        </motion.div>
      </header>

      <div className={styles.calculatorGrid}>
        {/* Input Panel */}
        <section className={styles.inputPanel}>
          <div className={styles.panelHeader}>
            <Calculator size={20} className={styles.panelIcon} />
            <h2>Operational Inputs</h2>
          </div>

          <div className={styles.formGroup}>
            <label>Current Lifting Method</label>
            <div className={styles.radioGroup}>
              <button 
                className={`${styles.radioButton} ${inputs.currentMethod === 'manual' ? styles.radioActive : ''}`}
                onClick={() => handleInputChange({ target: { name: 'currentMethod', value: 'manual' }})}
              >
                Manual / Basic
              </button>
              <button 
                className={`${styles.radioButton} ${inputs.currentMethod === 'old-crane' ? styles.radioActive : ''}`}
                onClick={() => handleInputChange({ target: { name: 'currentMethod', value: 'old-crane' }})}
              >
                Existing Crane (10yr+)
              </button>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                <label>Lifts Per Day</label>
                <span className={styles.fieldValue}>{inputs.liftingFrequency}</span>
              </div>
              <input 
                type="range" 
                name="liftingFrequency" 
                min="5" 
                max="100" 
                value={inputs.liftingFrequency}
                onChange={handleInputChange}
                className={styles.range}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                <label>Downtime (Hrs/Mo)</label>
                <span className={styles.fieldValue}>{inputs.downtimeHoursPerMonth}h</span>
              </div>
              <input 
                type="range" 
                name="downtimeHoursPerMonth" 
                min="0" 
                max="40" 
                value={inputs.downtimeHoursPerMonth}
                onChange={handleInputChange}
                className={styles.range}
              />
            </div>

            <div className={styles.field}>
              <label>Estimated Labor Cost (₹/hr)</label>
              <div className={styles.inputWrapper}>
                <DollarSign size={16} />
                <input 
                  type="number" 
                  name="laborRate" 
                  value={inputs.laborRate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Planned Investment (₹)</label>
              <div className={styles.inputWrapper}>
                <span className={styles.currency}>₹</span>
                <input 
                  type="number" 
                  name="craneCost" 
                  value={inputs.craneCost}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <Info size={18} />
            <p>Calculations are based on industrial averages for steel and heavy engineering sectors.</p>
          </div>
        </section>

        {/* Results Panel */}
        <section className={styles.resultsPanel}>
          <div className={styles.resultsHeader}>
            <h2>Financial Projection</h2>
            <div className={styles.liveIndicator}>
              <span className={styles.pulse} />
              Live Analysis
            </div>
          </div>

          <div className={styles.mainResult}>
            <div className={styles.resultLabel}>Estimated Yearly Savings</div>
            <div className={styles.resultValue}>₹ {results.yearlySaving}</div>
            <div className={styles.resultTrend}>
              <TrendingUp size={16} />
              <span>Includes maintenance & productivity gains</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <Clock size={20} className={styles.statIcon} />
              <div className={styles.statLabel}>Payback Period</div>
              <div className={styles.statValue}>{results.paybackMonths}<span> Months</span></div>
            </div>
            <div className={styles.statCard}>
              <Zap size={20} className={styles.statIcon} />
              <div className={styles.statLabel}>Efficiency Boost</div>
              <div className={styles.statValue}>{results.efficiencyPercentage}</div>
            </div>
          </div>

          <div className={styles.roiBanner}>
            <div className={styles.roiLabel}>Net 5-Year Profit Gain</div>
            <div className={styles.roiValue}>₹ {results.fiveYearROI}</div>
            <p className={styles.roiNote}>Calculated after deducting initial investment.</p>
          </div>

          <div className={styles.actions}>
            <Button to="/contact" variant="primary" size="lg" className={styles.cta} arrow>
              Get Official Quote
            </Button>
            <Button to="/configurator" variant="outline" size="lg" className={styles.secondaryCta}>
              Refine Config
            </Button>
          </div>
        </section>
      </div>

      {/* Comparison Table */}
      <section className={styles.comparison}>
        <div className={styles.comparisonHeader}>
          <h2>Why Amtech Pays for Itself</h2>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Feature</span>
            <span>Standard Crane</span>
            <span className={styles.highlight}>Amtech Smart System</span>
          </div>
          <div className={styles.tableRow}>
            <span>Safety Factor</span>
            <span>3.5 : 1</span>
            <span className={styles.highlight}>5.0 : 1</span>
          </div>
          <div className={styles.tableRow}>
            <span>Control System</span>
            <span>Contactors (Jerky)</span>
            <span className={styles.highlight}>VFD (Stepless Smooth)</span>
          </div>
          <div className={styles.tableRow}>
            <span>Maintenance Need</span>
            <span>Every 3 Months</span>
            <span className={styles.highlight}>Predictive (IoT Enabled)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
