import { useState, useEffect } from 'react';
import { Brain, MessageSquare, Zap, TrendingDown, BookOpen, Eye, Heart, Frown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Condition {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  brain: Brain,
  message: MessageSquare,
  zap: Zap,
  trending: TrendingDown,
  book: BookOpen,
  eye: Eye,
  heart: Heart,
  frown: Frown,
};

export function ScreeningList() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const { guestMode } = useAuth();

  useEffect(() => {
    loadConditions();
  }, []);

  const loadConditions = async () => {
    try {
      if (guestMode) {
        setConditions([
          { id: '1', name: 'Autismo (TEA)', description: 'Trastorno del Espectro Autista - Evaluación completa', icon: 'brain' },
          { id: '2', name: 'TDAH', description: 'Trastorno por Déficit de Atención e Hiperactividad', icon: 'zap' },
          { id: '3', name: 'Retraso del Habla', description: 'Evaluación del desarrollo del lenguaje', icon: 'message' },
          { id: '4', name: 'Retraso del Desarrollo', description: 'Evaluación general del desarrollo', icon: 'trending' },
          { id: '5', name: 'Trastornos del Aprendizaje', description: 'Dificultades de aprendizaje específicas', icon: 'book' },
          { id: '6', name: 'Procesamiento Sensorial', description: 'Dificultades de integración sensorial', icon: 'eye' },
          { id: '7', name: 'Ansiedad', description: 'Trastornos de ansiedad infantil', icon: 'heart' },
          { id: '8', name: 'Depresión', description: 'Síntomas depresivos en niños', icon: 'frown' },
        ]);
      } else {
        const { data, error } = await supabase
          .from('conditions')
          .select('*')
          .order('name');

        if (error) throw error;
        setConditions(data || []);
      }
    } catch (error) {
      console.error('Error loading conditions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Evaluaciones de Detección
        </h2>
        <p className="text-gray-600 mb-6">
          Selecciona una condición para comenzar el cuestionario de evaluación
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditions.map((condition) => {
            const IconComponent = iconMap[condition.icon] || Brain;
            return (
              <button
                key={condition.id}
                className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all border border-blue-100 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {condition.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {guestMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>Modo Invitado:</strong> Estás viendo datos de ejemplo. Crea una cuenta para guardar tus evaluaciones.
          </p>
        </div>
      )}
    </div>
  );
}
