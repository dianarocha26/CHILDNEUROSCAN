import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full" />
          </div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full flex items-center justify-center shadow-lg">
            <svg width="80" height="80" viewBox="0 0 100 100" className="animate-bounce-slow">
              <circle cx="50" cy="40" r="30" fill="#FCD34D" />
              <circle cx="38" cy="35" r="4" fill="#1F2937" />
              <circle cx="62" cy="35" r="4" fill="#1F2937" />
              <path d="M 35 50 Q 50 58 65 50" stroke="#1F2937" strokeWidth="2" fill="none" />
              <path d="M 30 25 Q 25 15 35 20" fill="#1F2937" />
              <path d="M 70 25 Q 75 15 65 20" fill="#1F2937" />
              <ellipse cx="35" cy="65" rx="8" ry="12" fill="#60A5FA" />
              <ellipse cx="65" cy="65" rx="8" ry="12" fill="#60A5FA" />
              <circle cx="20" cy="20" r="8" fill="#C084FC" opacity="0.6" className="animate-float" />
              <circle cx="80" cy="25" r="6" fill="#F472B6" opacity="0.6" className="animation-delay-200 animate-float" />
              <circle cx="15" cy="60" r="10" fill="#34D399" opacity="0.6" className="animation-delay-400 animate-float" />
            </svg>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Your Trusted Companion</span>
      </div>

      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        ChildNeuroScan
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Early Neurodevelopmental Screening
      </p>

      <div className="mt-12 flex gap-4 justify-center">
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
          Get Started Free
          <Sparkles className="w-5 h-5" />
        </button>
        <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-200">
          Sign In
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-500 max-w-3xl mx-auto">
        Explore our screening tools and educational resources in guest mode. Create a free account to save your progress and track development over time.
      </p>
    </div>
  );
}
