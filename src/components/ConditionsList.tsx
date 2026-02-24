import { useState, useEffect } from 'react';
import { Info, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConditionInfo {
  id: string;
  name: string;
  description: string;
  whatParentsSee: string[];
  howToHelp: string[];
}

export function ConditionsList() {
  const [conditions, setConditions] = useState<ConditionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<ConditionInfo | null>(null);
  const [language] = useState<'es' | 'en'>('es');

  useEffect(() => {
    loadConditions();
  }, []);

  async function loadConditions() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;

      const formattedConditions: ConditionInfo[] = (data || []).map((condition) => ({
        id: condition.id,
        name: language === 'es' ? condition.name_es : condition.name_en,
        description: language === 'es' ? condition.description_es : condition.description_en,
        whatParentsSee: parseJsonField(language === 'es' ? condition.what_parents_see_es : condition.what_parents_see_en),
        howToHelp: parseJsonField(language === 'es' ? condition.how_to_help_es : condition.how_to_help_en),
      }));

      setConditions(formattedConditions);
    } catch (err) {
      console.error('Error loading conditions:', err);
      setError('Error al cargar las condiciones');
    } finally {
      setLoading(false);
    }
  }

  function parseJsonField(field: string | null): string[] {
    if (!field) return [];
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Información sobre Condiciones
        </h2>
        <p className="text-gray-600 mb-6">
          Conoce más sobre las diferentes condiciones del neurodesarrollo
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {conditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setSelectedCondition(condition)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedCondition?.id === condition.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{condition.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {condition.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-4">
            {selectedCondition ? (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {selectedCondition.name}
                </h3>
                <p className="text-gray-700 mb-6">{selectedCondition.description}</p>

                <div className="space-y-4">
                  {selectedCondition.whatParentsSee.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Qué observan los padres
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {selectedCondition.whatParentsSee.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCondition.howToHelp.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Cómo ayudar
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {selectedCondition.howToHelp.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                            <ExternalLink className="w-3 h-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-xs text-gray-600">
                    <strong>Nota importante:</strong> Esta información es solo educativa.
                    Consulta siempre con profesionales de la salud para un diagnóstico apropiado.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 border border-gray-200 text-center">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecciona una condición para ver información detallada
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Recuerda:</strong> La detección temprana es clave. Si tienes preocupaciones sobre el desarrollo de tu hijo, consulta con un profesional.
        </p>
      </div>
    </div>
  );
}
