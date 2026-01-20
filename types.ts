
export enum StepStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  EXPERT = 'EXPERT',
  QUICK_FIX = 'QUICK_FIX'
}

export interface Step {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  status: StepStatus;
  difficulty: Difficulty;
  estimatedTime: string;
  tips: string[];
  specs?: {
    label: string;
    value: string;
  }[];
  tools: string[];
}

export interface TroubleshootingQuery {
  question: string;
  contextStepId?: string;
}

export interface UserProgress {
  completedStepIds: string[];
  currentStepId: string | null;
}
