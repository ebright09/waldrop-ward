
export type VisualTraits = {
  skinColor: string;
  hairColor: string;
  scrubColor?: string; // For staff
};

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type PropType = 'NONE' | 'RING_LIGHT' | 'SNEAKERS' | 'SERVERS' | 'CANDLES' | 'KETTLEBELLS' | 'ESSENTIAL_OILS';

export interface Option {
  id: string;
  label: string;
  actionText: string; // Short summary for internal use or small badges
  risk: RiskLevel;
  description: string; // The "One Line" description displayed to user
  successDetail: string; // Bespoke success message
  failureDetail: string; // Bespoke failure message
}

export interface Scenario {
  id: string;
  title: string;
  narrative: string; // The setup story
  complaint: string; // "Overheard" quote or chief complaint
  patientTraits: VisualTraits;
  propType: PropType; // NEW: Determines what 3D items load
  options: Option[];
}

export interface Stats {
  reputation: number; // 0-100
  babies: number; // Count delivered
  lawsuits: number; // Failure count
  shift: number; // 100 down to 0
  coffee: number; // Current caffeine level
}

export enum GamePhase {
  MENU = 'MENU',
  LOADING = 'LOADING',
  DECISION = 'DECISION',
  RESULT = 'RESULT',
  GAME_OVER = 'GAME_OVER'
}

export interface SimulationResult {
  success: boolean;
  outcomeText: string;
  statChanges: Partial<Stats>;
}
