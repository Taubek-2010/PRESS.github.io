import React from 'react';
import { Hand, Zap, Globe, Camera, MessageCircle, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartTranslating: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartTranslating }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      {}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center py-20">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-3 animate-bounce">
              <Hand className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              Gesture<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Xpress</span>
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 max-w-6xl mx-auto leading-relaxed mb-12 font-light">
            Revolutionary AI-powered sign language translation that breaks down communication barriers. 
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Using advanced 21-point hand tracking to bridge worlds through gestures.
            </span>
          </p>
          
          <button
            onClick={onStartTranslating}
            className="group inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 border-2 border-white/20 hover:border-white/40"
          >
            <span className="text-2xl">Start Translating</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {}
      <div className="relative z-10 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Advanced AI</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">21-Point Tracking</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Precise hand landmark detection using MediaPipe technology for accurate gesture recognition across all sign languages.
              </p>
            </div>
            
            <div className="group p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">12+ Languages</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Support for major sign languages including ASL, RSL, Kazakh Sign Language, and many more with native voice synthesis.
              </p>
            </div>
            
            <div className="group p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Real-time Translation</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                Instant gesture-to-speech translation with confidence indicators and visual feedback for seamless communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="relative z-10 px-4 pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="p-12 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500">
            <h3 className="text-4xl font-bold text-white mb-8">Built with Cutting-Edge Technology</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <span className="flex items-center space-x-3 mb-4 text-lg">
                <Camera className="w-5 h-5" />
                <span>MediaPipe AI</span>
              </span>
              <span className="flex items-center space-x-3 mb-4 text-lg">
                <Zap className="w-5 h-5" />
                <span>Real-time Processing</span>
              </span>
              <span className="flex items-center space-x-3 mb-4 text-lg">
                <MessageCircle className="w-5 h-5" />
                <span>Web Speech API</span>
              </span>
              <span className="flex items-center space-x-3 mb-4 text-lg">
                <Globe className="w-5 h-5" />
                <span>Multi-language Support</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;