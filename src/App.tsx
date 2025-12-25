import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LanguageSelection from './components/LanguageSelection';
import { TranslationInterface } from './components/TranslationInterface';
import { Language } from './types';

type AppState = 'landing' | 'language-selection' | 'translation';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleStartTranslating = () => {
    setCurrentState('language-selection');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentState('translation');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setSelectedLanguage(null);
  };

  const handleBackToLanguageSelection = () => {
    setCurrentState('language-selection');
  };

  const renderCurrentPage = () => {
    switch (currentState) {
      case 'landing':
        return <LandingPage onStartTranslating={handleStartTranslating} />;
      case 'language-selection':
        return (
          <LanguageSelection
            onLanguageSelect={handleLanguageSelect}
            onBack={handleBackToLanding}
          />
        );
      case 'translation':
        return selectedLanguage ? (
          <TranslationInterface
            language={selectedLanguage}
            onBack={handleBackToLanguageSelection}
          />
        ) : null;
      default:
        return <LandingPage onStartTranslating={handleStartTranslating} />;
    }
  };

  return <div className="font-sans">{renderCurrentPage()}</div>;
}

export default App;