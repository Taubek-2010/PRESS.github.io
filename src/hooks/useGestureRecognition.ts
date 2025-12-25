import { useState, useEffect } from 'react';
import { HandLandmark, GestureResult, SignLanguageGesture } from '../types';
import { ASL_GESTURES, RSL_GESTURES, KSL_GESTURES } from '../constants/gestures';

export const useGestureRecognition = (videoRef: React.RefObject<HTMLVideoElement>, canvasRef: React.RefObject<HTMLCanvasElement>, language: string, isRecording: boolean) => {
  const [currentGesture, setCurrentGesture] = useState<GestureResult | null>(null);
  const [gestureHistory, setGestureHistory] = useState<GestureResult[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const [handsDetected, setHandsDetected] = useState<boolean>(false);

  const getGesturesForLanguage = (lang: string): SignLanguageGesture[] => {
    switch (lang) {
      case 'en-US':
        return ASL_GESTURES;
      case 'ru-RU':
        return RSL_GESTURES;
      case 'kk-KZ':
        return KSL_GESTURES;
      default:
        return ASL_GESTURES;
    }
  };

  const calculateDistance = (landmark1: HandLandmark, landmark2: HandLandmark): number => {
    const dx = landmark1.x - landmark2.x;
    const dy = landmark1.y - landmark2.y;
    const dz = landmark1.z - landmark2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  useEffect(() => {
    if (!isRecording || !videoRef.current) return;

    const interval = setInterval(() => {
      const hasHands = Math.random() > 0.3;
      setHandsDetected(hasHands);

      if (hasHands) {
        const gestures = getGesturesForLanguage(language);
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        const confidence = 40 + Math.random() * 50;
        
        if (confidence > 60) {
          const gestureResult: GestureResult = {
            gesture: randomGesture.name,
            confidence: confidence,
            translation: randomGesture.name,
            timestamp: Date.now()
          };
          
          setCurrentGesture(gestureResult);
          setConfidence(confidence);
          
          if (confidence > 70) {
            setGestureHistory(prev => {
              const lastGesture = prev[prev.length - 1];
              if (!lastGesture || 
                  (lastGesture.gesture !== gestureResult.gesture && 
                   Date.now() - lastGesture.timestamp > 2000)) {
                return [...prev.slice(-9), gestureResult];
              }
              return prev;
            });
          }
        }
      } else {
        setCurrentGesture(null);
        setConfidence(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording, language, videoRef]);

  const recognizeGesture = (landmarks: HandLandmark[][]): GestureResult | null => {
    if (!landmarks || landmarks.length === 0) return null;

    const gestures = getGesturesForLanguage(language);
    const handLandmarks = landmarks[0]; // Use first hand

    if (!handLandmarks || handLandmarks.length < 21) return null;

    console.log('Processing landmarks for gesture recognition...');

    let bestMatch: GestureResult | null = null;
    let highestConfidence = 0;

    gestures.forEach(gesture => {
      const fingerTips = [4, 8, 12, 16, 20];
      const fingerBases = [3, 6, 10, 14, 18];
      
      let extendedFingers = 0;
      let confidence = 0;
      
      for (let i = 0; i < fingerTips.length; i++) {
        const tipIndex = fingerTips[i];
        const baseIndex = fingerBases[i];
        
        if (tipIndex < handLandmarks.length && baseIndex < handLandmarks.length) {
          const tip = handLandmarks[tipIndex];
          const base = handLandmarks[baseIndex];
          
          const isExtended = i === 0 
            ? Math.abs(tip.x - base.x) > 0.03 
            : tip.y < base.y - 0.015; 
          
          if (isExtended) {
            extendedFingers++;
          }
        }
      }
      
      console.log(`Gesture ${gesture.name}: ${extendedFingers} extended fingers`);
      
      if (gesture.name.includes('Hello') || gesture.name === 'Привет' || gesture.name === 'Сәлем') {
        confidence = extendedFingers >= 3 ? 0.85 : 0.2;
      } else if (gesture.name.includes('Thank you') || gesture.name === 'Спасибо' || gesture.name === 'Рахмет') {
        confidence = extendedFingers <= 2 ? 0.8 : 0.2;
      } else if (gesture.name.includes('Please') || gesture.name === 'Пожалуйста' || gesture.name === 'Өтінемін') {
        confidence = extendedFingers === 2 ? 0.8 : 0.2;
      } else if (gesture.name.includes('Yes') || gesture.name === 'Да' || gesture.name === 'Иә') {
        confidence = extendedFingers === 1 ? 0.7 : 0.2;
      } else if (gesture.name.includes('No') || gesture.name === 'Нет' || gesture.name === 'Жоқ') {
        confidence = extendedFingers <= 1 ? 0.75 : 0.2;
      } else if (gesture.name.includes('Good') || gesture.name === 'Хорошо' || gesture.name === 'Жақсы') {
        const thumb = handLandmarks[4];
        const thumbBase = handLandmarks[3];
        confidence = (thumb.y < thumbBase.y - 0.03 && extendedFingers <= 2) ? 0.8 : 0.2;
      } else if (gesture.name.includes('Bad') || gesture.name === 'Плохо' || gesture.name === 'Жаман') {
        confidence = extendedFingers <= 1 ? 0.75 : 0.2;
      } else if (gesture.name.includes('Love') || gesture.name === 'Любовь' || gesture.name === 'Махаббат') {
        confidence = extendedFingers >= 2 && extendedFingers <= 4 ? 0.75 : 0.2;
      } else if (gesture.name.includes('Help') || gesture.name === 'Помощь' || gesture.name === 'Көмек') {
        confidence = extendedFingers >= 1 && extendedFingers <= 3 ? 0.7 : 0.2;
      } else if (gesture.name.includes('Sorry') || gesture.name === 'Извините' || gesture.name === 'Кешіріңіз') {
        confidence = extendedFingers <= 2 ? 0.7 : 0.2;
      } else if (gesture.name.includes('Water') || gesture.name === 'Вода' || gesture.name === 'Су') {
        confidence = extendedFingers >= 2 && extendedFingers <= 4 ? 0.7 : 0.2;
      } else if (gesture.name.includes('Food') || gesture.name === 'Еда' || gesture.name === 'Тамақ') {
        confidence = extendedFingers >= 1 && extendedFingers <= 3 ? 0.7 : 0.2;
      } else if (gesture.name.includes('Home') || gesture.name === 'Дом' || gesture.name === 'Үй') {
        confidence = extendedFingers >= 3 ? 0.8 : 0.2;
      } else if (gesture.name.includes('Work') || gesture.name === 'Работа' || gesture.name === 'Жұмыс') {
        confidence = extendedFingers >= 1 && extendedFingers <= 3 ? 0.7 : 0.2;
      } else if (gesture.name.includes('Family') || gesture.name === 'Семья' || gesture.name === 'Отбасы') {
        confidence = extendedFingers >= 2 && extendedFingers <= 4 ? 0.75 : 0.2;
      }
      
      if (confidence > highestConfidence && confidence > 0.35) {
        highestConfidence = confidence;
        bestMatch = {
          gesture: gesture.name,
          confidence: confidence * 100,
          translation: gesture.name,
          timestamp: Date.now()
        };
      }
    });

    if (bestMatch) {
      console.log(`Best match: ${bestMatch.gesture} with ${bestMatch.confidence}% confidence`);
    }

    return bestMatch;
  };

  const processLandmarks = (landmarks: HandLandmark[][]) => {
    if (!isRecording) return;
    
    const gesture = recognizeGesture(landmarks);
    
    if (gesture && gesture.confidence > 35) {
      console.log('Setting current gesture:', gesture.gesture);
      setCurrentGesture(gesture);
    } else {
      if (currentGesture && Date.now() - currentGesture.timestamp > 2000) {
        setCurrentGesture(null);
      }
    }
  };

  const addGestureToHistory = (gesture: GestureResult) => {
    console.log('Adding gesture to history:', gesture.gesture);
    setGestureHistory(prev => {
      const lastGesture = prev[prev.length - 1];
      if (prev.length === 0 || !lastGesture || 
          (lastGesture.gesture !== gesture.gesture && Date.now() - lastGesture.timestamp > 1500)) {
        console.log('Gesture added to history');
        return [...prev.slice(-9), gesture];
      }
      console.log('Gesture not added - too similar or too recent');
      return prev;
    });
  };

  return {
    currentGesture,
    confidence,
    gestureHistory,
    handsDetected,
    processLandmarks,
    addGestureToHistory,
    clearHistory: () => {
      setGestureHistory([]);
      setCurrentGesture(null);
      setConfidence(0);
    }
  };
};