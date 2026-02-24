import { useState, useEffect } from 'react';
import { Brain, MessageSquare, Zap, TrendingDown, BookOpen, Eye, Heart, Frown, MessageCircle, Baby, Book, Ear, Activity, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ScreeningQuestionnaire } from './ScreeningQuestionnaire';

interface Condition {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, any> = {
  brain: Brain,
  'message-square': MessageSquare,
  'message-circle': MessageCircle,
  zap: Zap,
  'trending-down': TrendingDown,
  'book-open': BookOpen,
  book: Book,
  baby: Baby,
  eye: Eye,
  ear: Ear,
  heart: Heart,
  frown: Frown,
  activity: Activity,
  'alert-triangle': AlertTriangle,
};

export function ScreeningList() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [language] = useState<'es' | 'en'>('es');
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

  useEffect(() => {
    loadConditions();
  }, []);

  const loadConditions = async () => {
    try {
      const { data, error } = await supabase
        .from('conditions')
        .select('id, code, name_es, name_en, description_es, description_en, icon, color')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;

      const formattedConditions: Condition[] = (data || []).map((condition) => ({
        id: condition.id,
        name: language === 'es' ? condition.name_es : condition.name_en,
        description: language === 'es' ? condition.description_es : condition.description_en,
        icon: condition.icon || 'brain',
        color: condition.color || 'blue',
      }));

      setConditions(formattedConditions);
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

  if (selectedCondition) {
    return (
      <ScreeningQuestionnaire
        conditionId={selectedCondition.id}
        conditionName={selectedCondition.name}
        onBack={() => setSelectedCondition(null)}
        onComplete={() => {
          setSelectedCondition(null);
          alert('Evaluación completada con éxito');
        }}
      />
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
                onClick={() => setSelectedCondition(condition)}
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

    </div>
  );
}
