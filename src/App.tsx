import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { InstallPrompt } from './components/InstallPrompt';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VideoSection } from './components/VideoSection';
import { LanguageSelector } from './components/LanguageSelector';

function AppContent() {
  const { user, guestMode, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const translations = {
    es: {
      hero: {
        badge: 'Detección Temprana del Neurodesarrollo',
        title: 'ChildNeuroScan',
        subtitle: 'Herramienta integral para la evaluación y seguimiento del desarrollo infantil',
        cta: 'Comenzar Evaluación',
        signIn: 'Iniciar Sesión',
        description: 'Plataforma basada en evidencia científica para padres, cuidadores y profesionales de la salud. Detecta tempranamente posibles señales de autismo, ADHD, retrasos del lenguaje y otras condiciones del neurodesarrollo.'
      },
      features: {
        title: 'Características Principales',
        tracking: {
          title: 'Seguimiento Continuo',
          description: 'Monitorea hitos del desarrollo y comportamientos de manera sistemática'
        },
        analysis: {
          title: 'Análisis Inteligente',
          description: 'Algoritmos validados identifican patrones y señales de alerta'
        },
        resources: {
          title: 'Recursos Educativos',
          description: 'Accede a guías, videos y materiales basados en evidencia'
        },
        community: {
          title: 'Red de Apoyo',
          description: 'Conecta con otros padres y profesionales de la salud'
        }
      }
    },
    en: {
      hero: {
        badge: 'Early Neurodevelopmental Screening',
        title: 'ChildNeuroScan',
        subtitle: 'Comprehensive tool for child development assessment and tracking',
        cta: 'Start Screening',
        signIn: 'Sign In',
        description: 'Evidence-based platform for parents, caregivers and healthcare professionals. Early detection of autism, ADHD, speech delays and other neurodevelopmental conditions.'
      },
      features: {
        title: 'Key Features',
        tracking: {
          title: 'Continuous Tracking',
          description: 'Monitor developmental milestones and behaviors systematically'
        },
        analysis: {
          title: 'Smart Analysis',
          description: 'Validated algorithms identify patterns and warning signs'
        },
        resources: {
          title: 'Educational Resources',
          description: 'Access evidence-based guides, videos and materials'
        },
        community: {
          title: 'Support Network',
          description: 'Connect with other parents and healthcare professionals'
        }
      }
    }
  };

  const t = translations[language];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (user || guestMode) {
    return (
      <>
        <Dashboard />
        <InstallPrompt />
      </>
    );
  }

  if (showAuth) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowAuth(false)}
          className="absolute top-4 left-4 z-10 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver
        </button>
        <Auth />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LanguageSelector language={language} setLanguage={setLanguage} />

        <div onClick={() => setShowAuth(true)} className="cursor-pointer">
          <Hero translations={t.hero} />
        </div>

        <Features translations={t.features} />

        <VideoSection />

        <InstallPrompt />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
