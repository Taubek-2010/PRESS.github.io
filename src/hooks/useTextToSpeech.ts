import { useState, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = (text: string, languageCode: string = 'en-US') => {
    console.log('Speaking:', text, 'in language:', languageCode);
    
    if (!text || text.trim() === '') {
      console.log('No text to speak');
      return;
    }
    
    if (isSpeaking) {
      console.log('Cancelling previous speech');
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const langPrefix = languageCode.split('-')[0];
    let voice = voices.find(v => v.lang === languageCode);
    
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(langPrefix));
    }
    
    if (!voice && voices.length > 0) {
      voice = voices[0];
    }
    
    if (voice) {
      utterance.voice = voice;
      console.log('Using voice:', voice.name, voice.lang);
    } else {
      console.log('No suitable voice found, using default');
    }

    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    console.log('Starting speech synthesis');
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking, voices };
};