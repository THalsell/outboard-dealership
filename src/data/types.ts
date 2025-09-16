// TypeScript interfaces for guides data

export interface Feature {
  title: string;
  description: string;
}

export interface Brand {
  name: string;
  rating: number;
  maxStars: number;
  strengths: string[];
}

export interface MaintenanceItem {
  title: string;
  description?: string;
  items?: string[];
}

export interface ShaftLengthInfo {
  title: string;
  length?: string;
  transom?: string;
  description: string;
}

export interface HorsepowerFAQ {
  id: string;
  question: string;
  answer: string | { text: string; list?: string[] };
}