import { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VideoSection } from './components/VideoSection';
import { LanguageSelector } from './components/LanguageSelector';
import { Language, Translations } from './types';

const translations: Record<Language, Translations> = {
  en: {
    hero: {
      badge: 'Your Trusted Companion',
      title: 'ChildNeuroScan',
      subtitle: 'Early Neurodevelopmental Screening',
      cta: 'Get Started Free',
      signIn: 'Sign In',
      description: 'Explore our screening tools and educational resources in guest mode. Create a free account to save your progress and track development over time.',
    },
    features: {
      title: 'Features',
      tracking: {
        title: 'Tracking',
        description: 'Record daily progress',
      },
      analysis: {
        title: 'Analysis',
        description: 'Advanced insights',
      },
      resources: {
        title: 'Resources',
        description: 'Expert guidance',
      },
      community: {
        title: 'Community',
        description: 'Connect with others',
      },
    },
  },
  es: {
    hero: {
      badge: 'Tu Compañero de Confianza',
      title: 'ChildNeuroScan',
      subtitle: 'Detección Temprana del Neurodesarrollo',
      cta: 'Comenzar Gratis',
      signIn: 'Iniciar Sesión',
      description: 'Explora nuestras herramientas de detección y recursos educativos en modo invitado. Crea una cuenta gratuita para guardar tu progreso y hacer seguimiento del desarrollo a lo largo del tiempo.',
    },
    features: {
      title: 'Características',
      tracking: {
        title: 'Seguimiento',
        description: 'Registra el progreso diario',
      },
      analysis: {
        title: 'Análisis',
        description: 'Información avanzada',
      },
      resources: {
        title: 'Recursos',
        description: 'Orientación experta',
      },
      community: {
        title: 'Comunidad',
        description: 'Conecta con otros',
      },
    },
  },
};

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-8">
          <LanguageSelector
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        <Hero translations={t.hero} />
        <Features translations={t.features} />
        <VideoSection />
      </div>
    </div>
  );
}

export default App;
