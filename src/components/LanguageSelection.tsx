import React, { useState } from 'react';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants/languages';
import { Language } from '../types';

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
  onBack: () => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect, onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageClick = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="relative z-10 min-h-screen flex flex-col">
        {}
        <div className="p-6">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Choose Your Language
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Select the sign language you'd like to translate from. Each language uses its unique gesture patterns.
            </p>
          </div>

          {}
          <div className="w-full max-w-4xl">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageClick(language)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedLanguage?.code === language.code
                      ? 'border-blue-400 bg-blue-500/20 scale-105'
                      : 'border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/15 hover:scale-105'
                  } backdrop-blur-lg`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{language.flag}</div>
                    <h3 className="font-semibold text-white text-lg mb-1">
                      {language.name.split('(')[0].trim()}
                    </h3>
                    <p className="text-sm text-white/70">
                      {language.name.includes('(') ? `(${language.name.split('(')[1]}` : ''}
                    </p>
                  </div>
                  
                  {selectedLanguage?.code === language.code && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {}
            {selectedLanguage && (
              <div className="text-center">
                <button
                  onClick={handleContinue}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <span className="text-lg">Continue with {selectedLanguage.name.split('(')[0].trim()}</span>
                  <Check className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;