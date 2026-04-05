export enum View {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  WORKOUTS = 'WORKOUTS',
  SCHEDULE = 'SCHEDULE',
  NUTRITION = 'NUTRITION',
  PROFILE = 'PROFILE'
}

export interface User {
  name: string;
  photo: string;
  email: string;
  level: string;
  since: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  kcal: number;
  image: string;
  tags: string[];
  description: string;
  exercises: Exercise[];
}

export interface ClassSession {
  id: string;
  time: string;
  period: 'Manhã' | 'Tarde' | 'Noite';
  title: string;
  instructor: string;
  spots: number;
  totalSpots: number;
  booked: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  tags: string[];
  time: string;
  kcal: number;
  img: string;
  ingredients: string[];
  method: string[];
}

export interface Challenge {
  id: string;
  title: string;
  daysLeft: number;
  totalDays: number;
  currentDay: number;
  progress: number; // 0-100
}

export interface UserStats {
  weight: number;
  weightDelta: number;
  bodyFat: number;
  bodyFatDelta: number;
  muscleMass: number;
  muscleMassDelta: number;
}

export interface Badge {
  id: string;
  icon: string; // lucide icon name
  label: string;
  unlocked: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  kcal: number;
  status: 'COMPLETED' | 'SKIPPED';
}