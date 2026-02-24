import { Sparkles } from 'lucide-react';

interface HeroProps {
  translations: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    signIn: string;
    description: string;
  };
}

export function Hero({ translations }: HeroProps) {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce-gentle">
        <Sparkles className="w-4 h-4" />
        {translations.badge}
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
        {translations.title}
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
        {translations.subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
          {translations.cta}
          <Sparkles className="w-5 h-5" />
        </button>
        
        <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-200">
          {translations.signIn}
        </button>
      </div>

      <div className="mt-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-3xl opacity-20 blur-3xl animate-pulse"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center animate-bounce-slow">
              <div className="text-4xl">👶</div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {translations.description}
          </p>
        </div>
      </div>
    </div>
  );
}
