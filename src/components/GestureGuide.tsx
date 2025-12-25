import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Hand, Eye } from 'lucide-react';

interface GestureGuideProps {
  currentGesture?: string | null;
}

const GESTURE_GUIDES = [
  {
    name: 'Привет',
    english: 'Hello',
    description: 'Open palm facing forward, all fingers extended',
    instructions: [
      'Extend all 5 fingers',
      'Palm faces the camera',
      'Hand at shoulder height',
      'Slight wave motion optional'
    ],
    handShape: '✋',
    difficulty: 'Easy'
  },
  {
    name: 'Да',
    english: 'Yes',
    description: 'Closed fist with nodding motion',
    instructions: [
      'Make a closed fist',
      'All fingers curled in',
      'Thumb on top of fingers',
      'Small up-down motion'
    ],
    handShape: '✊',
    difficulty: 'Easy'
  },
  {
    name: 'Нет',
    english: 'No',
    description: 'Index finger extended, wagging motion',
    instructions: [
      'Extend only index finger',
      'Other fingers closed',
      'Point finger upward',
      'Small left-right motion'
    ],
    handShape: '☝️',
    difficulty: 'Easy'
  },
  {
    name: 'Пока',
    english: 'Bye',
    description: 'Open hand waving side to side',
    instructions: [
      'Open palm facing forward',
      'All fingers extended',
      'Wave left to right',
      'Gentle motion'
    ],
    handShape: '👋',
    difficulty: 'Easy'
  },
  {
    name: 'Один',
    english: 'One',
    description: 'Index finger extended upward',
    instructions: [
      'Extend index finger only',
      'Point straight up',
      'Other fingers closed',
      'Thumb tucked in'
    ],
    handShape: '☝️',
    difficulty: 'Easy'
  },
  {
    name: 'Два',
    english: 'Two',
    description: 'Index and middle fingers extended',
    instructions: [
      'Extend index and middle fingers',
      'Form a "V" shape',
      'Other fingers closed',
      'Palm can face forward or back'
    ],
    handShape: '✌️',
    difficulty: 'Easy'
  },
  {
    name: 'Спасибо',
    english: 'Thank you',
    description: 'Flat hand touching chin, then moving forward',
    instructions: [
      'Flat hand near chin',
      'All fingers together',
      'Touch chin lightly',
      'Move hand forward and down'
    ],
    handShape: '🤚',
    difficulty: 'Medium'
  },
  {
    name: 'Хорошо',
    english: 'Good',
    description: 'Thumbs up gesture',
    instructions: [
      'Extend thumb upward',
      'Close other fingers',
      'Fist with thumb up',
      'Confident gesture'
    ],
    handShape: '👍',
    difficulty: 'Easy'
  },
  {
    name: 'Плохо',
    english: 'Bad',
    description: 'Thumbs down gesture',
    instructions: [
      'Extend thumb downward',
      'Close other fingers',
      'Fist with thumb down',
      'Clear downward motion'
    ],
    handShape: '👎',
    difficulty: 'Easy'
  },
  {
    name: 'Извините',
    english: 'Sorry',
    description: 'Fist circling over heart area',
    instructions: [
      'Make a closed fist',
      'Place over heart area',
      'Small circular motion',
      'Gentle, apologetic gesture'
    ],
    handShape: '✊',
    difficulty: 'Medium'
  }
];

export const GestureGuide: React.FC<GestureGuideProps> = ({ currentGesture }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedGesture = GESTURE_GUIDES[selectedIndex];

  const nextGesture = () => {
    setSelectedIndex((prev) => (prev + 1) % GESTURE_GUIDES.length);
  };

  const prevGesture = () => {
    setSelectedIndex((prev) => (prev - 1 + GESTURE_GUIDES.length) % GESTURE_GUIDES.length);
  };

  const selectGesture = (index: number) => {
    setSelectedIndex(index);
  };

  const isCurrentlyDetected = currentGesture === selectedGesture.name;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Hand className="w-6 h-6 text-white" />
          </div>
          Gesture Guide
        </h2>
        {isCurrentlyDetected && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
            <Eye className="w-4 h-4" />
            Currently Detected!
          </div>
        )}
      </div>

      {}
      <div className={`p-6 rounded-xl border-2 transition-all duration-300 mb-6 ${
        isCurrentlyDetected 
          ? 'border-green-400 bg-green-50' 
          : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevGesture}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="text-center flex-1">
            <div className="text-6xl mb-3">{selectedGesture.handShape}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {selectedGesture.name}
            </h3>
            <p className="text-lg text-gray-600 mb-2">({selectedGesture.english})</p>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedGesture.difficulty === 'Easy' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {selectedGesture.difficulty}
            </span>
          </div>
          
          <button
            onClick={nextGesture}
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-700 font-medium mb-3">{selectedGesture.description}</p>
          <div className="space-y-2">
            {selectedGesture.instructions.map((instruction, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium text-xs">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-5 gap-3">
        {GESTURE_GUIDES.map((gesture, index) => (
          <button
            key={gesture.name}
            onClick={() => selectGesture(index)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
              index === selectedIndex
                ? 'border-blue-400 bg-blue-50'
                : currentGesture === gesture.name
                ? 'border-green-400 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-1">{gesture.handShape}</div>
            <div className="text-xs font-medium text-gray-700">{gesture.english}</div>
            <div className="text-xs text-gray-500">{gesture.name}</div>
          </button>
        ))}
      </div>

      {}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">💡 Tips for Better Recognition:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Keep your hand clearly visible in the camera frame</div>
          <div>• Maintain steady hand position for 2-3 seconds</div>
          <div>• Ensure good lighting on your hands</div>
          <div>• Follow the step-by-step instructions above</div>
        </div>
      </div>
    </div>
  );
};