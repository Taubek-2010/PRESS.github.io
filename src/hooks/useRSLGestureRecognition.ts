import { useState, useCallback } from 'react';

export interface GestureResult {
  gesture: string;
  confidence: number;
  translation: string;
  timestamp: number;
}

export interface HandLandmarks {
  x: number;
  y: number;
  z: number;
}

export interface HandResults {
  multiHandLandmarks?: HandLandmarks[][];
  multiHandedness?: Array<{ label: string; score: number }>;
}

const calculateDistance = (point1: HandLandmarks, point2: HandLandmarks): number => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + 
    Math.pow(point1.y - point2.y, 2) + 
    Math.pow(point1.z - point2.z, 2)
  );
};

const isFingerExtended = (landmarks: HandLandmarks[], fingerTip: number, fingerPip: number): boolean => {
  return landmarks[fingerTip].y < landmarks[fingerPip].y;
};

const getExtendedFingers = (landmarks: HandLandmarks[]): number[] => {
  const extendedFingers: number[] = [];
  
  if (landmarks[4].x > landmarks[3].x) {
    extendedFingers.push(0);
  }
  
  if (isFingerExtended(landmarks, 8, 6)) {
    extendedFingers.push(1);
  }
  
  if (isFingerExtended(landmarks, 12, 10)) {
    extendedFingers.push(2);
  }
  
  if (isFingerExtended(landmarks, 16, 14)) {
    extendedFingers.push(3);
  }
  
  if (isFingerExtended(landmarks, 20, 18)) {
    extendedFingers.push(4);
  }
  
  return extendedFingers;
};

const recognizeGesture = (landmarks: HandLandmarks[]): GestureResult | null => {
  const extendedFingers = getExtendedFingers(landmarks);
  const extendedCount = extendedFingers.length;
  
  if (extendedCount === 5) {
    return {
      gesture: 'Привет',
      confidence: 0.95,
      translation: 'Hello',
      timestamp: Date.now()
    };
  }
  
  if (extendedCount === 1 && extendedFingers.includes(1)) {
    return {
      gesture: 'Один',
      confidence: 0.92,
      translation: 'One',
      timestamp: Date.now()
    };
  }
  
  if (extendedCount === 2 && extendedFingers.includes(1) && extendedFingers.includes(2)) {
    return {
      gesture: 'Два',
      confidence: 0.90,
      translation: 'Two',
      timestamp: Date.now()
    };
  }
  
  if (extendedCount === 1 && extendedFingers.includes(0)) {
    return {
      gesture: 'Хорошо',
      confidence: 0.88,
      translation: 'Good',
      timestamp: Date.now()
    };
  }
  
  if (extendedCount === 0) {
    return {
      gesture: 'Да',
      confidence: 0.85,
      translation: 'Yes',
      timestamp: Date.now()
    };
  }
  
  if (extendedCount === 4 && !extendedFingers.includes(0)) {
    return {
      gesture: 'Спасибо',
      confidence: 0.80,
      translation: 'Thank you',
      timestamp: Date.now()
    };
  }
  
  return null;
};

export const useRSLGestureRecognition = () => {
  const [currentGesture, setCurrentGesture] = useState<GestureResult | null>(null);
  const [gestureHistory, setGestureHistory] = useState<GestureResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processHandResults = useCallback((results: HandResults) => {
    setIsProcessing(true);
    
    try {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const gesture = recognizeGesture(landmarks);
        
        if (gesture) {
          setCurrentGesture(gesture);
          setGestureHistory(prev => [gesture, ...prev.slice(0, 9)]); 
        }
      } else {
        setCurrentGesture(null);
      }
    } catch (error) {
      console.error('Error processing hand results:', error);
      setCurrentGesture(null);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setGestureHistory([]);
    setCurrentGesture(null);
  }, []);

  return {
    currentGesture,
    gestureHistory,
    isProcessing,
    processHandResults,
    clearHistory
  };
};