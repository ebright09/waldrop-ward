
import { Option, SimulationResult, Stats } from '../types';

export const calculateOutcome = (option: Option, currentStats: Stats): SimulationResult => {
  const roll = Math.random();
  let threshold = 0.95; 
  
  // Normalize risk to Title Case
  const riskNormalized = option.risk.charAt(0).toUpperCase() + option.risk.slice(1).toLowerCase();
  
  // Risk Math - HARDER
  switch (riskNormalized) {
    case 'Low': 
      threshold = 0.85; // 85% Success
      break;
    case 'Medium': 
      threshold = 0.50; // 50% Success
      break;
    case 'High': 
      threshold = 0.20; // 20% Success - DANGEROUS
      break;
    case 'Critical': 
      threshold = 0.10; // 10% Success
      break;
    default:
      threshold = 0.50;
  }

  const success = roll < threshold;

  const statChanges: Partial<Stats> = {
    shift: currentStats.shift - 10, // Time passes
    coffee: Math.max(0, currentStats.coffee - 15)
  };

  let outcomeText = "";

  if (success) {
    // Use bespoke success detail
    outcomeText = `SUCCESS: ${option.successDetail}`;
    statChanges.reputation = Math.min(100, currentStats.reputation + (riskNormalized === 'High' ? 15 : 5));
    statChanges.babies = currentStats.babies + 1;
  } else {
    // Use bespoke failure detail
    outcomeText = `FAILURE: ${option.failureDetail}`;
    statChanges.reputation = Math.max(0, currentStats.reputation - 15);
    statChanges.lawsuits = currentStats.lawsuits + 1;
    
    if (riskNormalized === 'High') {
        statChanges.lawsuits = currentStats.lawsuits + 2; // Double penalty
        statChanges.reputation = Math.max(0, currentStats.reputation - 25);
        outcomeText += " A MAJOR lawsuit has been filed. The board is furious.";
    }
  }

  return {
    success,
    outcomeText,
    statChanges
  };
};
