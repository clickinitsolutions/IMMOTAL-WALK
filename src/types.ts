export interface WisdomQuote {
  quote: string;
  author: string;
  category: string;
  source: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  reflection?: string;
  focusWord?: string;
  mindfulnessTask?: string;
}

export interface MeditationPreferences {
  focus: string;
  durationMinutes: number;
  technique: string;
}

export interface MeditationSession {
  title: string;
  preparation: string;
  steps: string[];
  integration: string;
}

export interface BreathworkPattern {
  name: string;
  description: string;
  inhale: number; // seconds
  holdIn: number; // seconds
  exhale: number; // seconds
  holdOut: number; // seconds
}

export interface YogaPose {
  name: string;
  sanskrit: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  benefits: string[];
  steps: string[];
  image: string;
}

export interface Retreat {
  id: string;
  title: string;
  location: string;
  duration: string;
  description: string;
  image: string;
  price: string;
  inclusions: string[];
}
