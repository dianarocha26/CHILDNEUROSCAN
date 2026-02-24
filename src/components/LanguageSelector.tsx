import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
      <Globe className="w-5 h-5 text-blue-600" />
      <button
        onClick={() => onLanguageChange('en')}
        className={'px-3 py-1 rounded-full transition-all duration-300 ' + (
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-blue-50'
        )}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('es')}
        className={'px-3 py-1 rounded-full transition-all duration-300 ' + (
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-blue-50'
        )}
      >
        ES
      </button>
    </div>
  );
}
