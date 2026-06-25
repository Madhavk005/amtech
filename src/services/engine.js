/**
 * Amtech Cranes Engineering Engine
 * Centralized business logic, formulas, and calculations.
 */

/**
 * Determines the optimal equipment type based on user specifications.
 * @param {Object} config - The configuration object (load, span, environment, industry).
 * @returns {string} - The crane type ID.
 */
export function determineEquipmentType(config) {
  const { environment, loadCapacity, spanLength, industry } = config;

  if (environment === 'outdoor') {
    return 'goliath';
  }

  // Heavy loads or large spans generally require double girders for stability
  if (loadCapacity > 20 || spanLength > 20) {
    return 'double-girder';
  }

  // Lower loads, especially in general manufacturing, are often single girder
  if (loadCapacity <= 10 && industry === 'Manufacturing') {
    return 'single-girder';
  }

  // For very small spaces and loads, we can suggest jib or underslung depending on further context,
  // but by default we return single-girder as the primary baseline.
  if (loadCapacity <= 10 && spanLength <= 10) {
    return 'underslung-crane';
  }

  return 'single-girder';
}

/**
 * Calculates the estimated structural weight of the crane in tons.
 * Formula includes safety margins based on span and load.
 * @param {Object} config - The configuration object.
 * @returns {string} - The estimated structural weight rounded to 1 decimal.
 */
export function calculateStructuralWeight(config) {
  const { loadCapacity, spanLength } = config;
  
  // Example empirical formula: Base weight dependent on span + capacity coefficient
  const baseSpanWeight = spanLength * 0.25;
  const loadWeightMultiplier = loadCapacity * 0.12;
  
  const estimatedWeight = baseSpanWeight + loadWeightMultiplier;
  return Math.max(estimatedWeight, 0).toFixed(1);
}

/**
 * Calculates the precise safety factor based on duty class and load capacity.
 * @param {Object} config - The configuration object.
 * @returns {string} - The calculated safety factor.
 */
export function calculateSafetyFactor(config) {
  const { dutyClass, loadCapacity } = config;
  
  let baseFactor = 5.0; // Standard minimum safety factor
  
  // Higher duty classes demand higher safety margins
  if (dutyClass === 'm7' || dutyClass === 'm8') {
    baseFactor = 6.0;
  }
  
  // Extremely heavy loads might require elevated safety factoring
  if (loadCapacity >= 100) {
    baseFactor += 0.5;
  }
  
  return baseFactor.toFixed(1);
}
