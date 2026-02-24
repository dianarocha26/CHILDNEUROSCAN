import { useState, useEffect } from 'react';
import { FileText, Calendar, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ScreeningResult {
  id: string;
  child_name: string;
  child_age: number;
  condition_type: string;
  scores: {
    total: number;
    percentage: number;
    red_flags: number;
  };
  recommendations: string[];
  created_at: string;
}

export function ScreeningResults() {
  const { user } = useAuth();
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<ScreeningResult | null>(null);

  useEffect(() => {
    loadResults();
  }, [user]);

  async function loadResults() {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('screening_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRiskLevel = (percentage: number, redFlags: number) => {
    if (redFlags > 0 || percentage > 70) {
      return { level: 'Alto', color: 'red' };
    } else if (percentage > 50) {
      return { level: 'Moderado', color: 'yellow' };
    } else if (percentage > 30) {
      return { level: 'Bajo', color: 'blue' };
    } else {
      return { level: 'Mínimo', color: 'green' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay resultados aún
          </h3>
          <p className="text-gray-600">
            Completa una evaluación para ver tus resultados aquí
          </p>
        </div>
      </div>
    );
  }

  if (selectedResult) {
    const risk = getRiskLevel(selectedResult.scores.percentage, selectedResult.scores.red_flags);
    const riskColors = {
      red: 'bg-red-50 border-red-200 text-red-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
    };

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedResult(null)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver a resultados
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedResult.condition_type}
              </h2>
              <p className="text-gray-600">
                {selectedResult.child_name} - {selectedResult.child_age} meses
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(selectedResult.created_at)}
              </p>
            </div>

            <div className={`px-4 py-2 rounded-lg border ${riskColors[risk.color as keyof typeof riskColors]}`}>
              <span className="font-semibold">Nivel: {risk.level}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Puntuación</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {selectedResult.scores.percentage.toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">Señales de Alerta</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {selectedResult.scores.red_flags}
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Total</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {selectedResult.scores.total}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recomendaciones
            </h3>
            <ul className="space-y-3">
              {selectedResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Importante:</strong> Estos resultados son solo orientativos.
              Para un diagnóstico formal, consulta con un profesional de la salud calificado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Historial de Evaluaciones
        </h2>
        <p className="text-gray-600 mb-6">
          Revisa los resultados de evaluaciones anteriores
        </p>

        <div className="space-y-4">
          {results.map((result) => {
            const risk = getRiskLevel(result.scores.percentage, result.scores.red_flags);
            const riskColors = {
              red: 'bg-red-100 text-red-700',
              yellow: 'bg-yellow-100 text-yellow-700',
              blue: 'bg-blue-100 text-blue-700',
              green: 'bg-green-100 text-green-700',
            };

            return (
              <button
                key={result.id}
                onClick={() => setSelectedResult(result)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {result.condition_type}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${riskColors[risk.color as keyof typeof riskColors]}`}>
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {result.child_name} - {result.child_age} meses
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(result.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {result.scores.percentage.toFixed(0)}%
                    </p>
                    {result.scores.red_flags > 0 && (
                      <div className="flex items-center gap-1 text-orange-600 text-sm mt-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{result.scores.red_flags} alertas</span>
                      </div>
                    )}
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
