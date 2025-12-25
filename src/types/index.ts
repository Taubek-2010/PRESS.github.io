export interface Language {
  code: string;
  name: string;
  flag: string;
  voiceCode: string;
}

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface GestureResult {
  gesture: string;
  confidence: number;
  translation: string;
  timestamp: number;
}

export interface SignLanguageGesture {
  name: string;
  landmarks: number[][];
  threshold: number;
}