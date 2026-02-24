import { Globe } from 'lucide-react';

export function LanguageSelector() {
  return (
    <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
      <Globe className="w-5 h-5 text-gray-600" />
      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
        EN
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:shadow-md transition-all duration-200 border border-gray-200">
        ES
      </button>
    </div>
  );
}
