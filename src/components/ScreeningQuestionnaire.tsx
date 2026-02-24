import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: string;
  question: string;
  order_index: number;
  weight: number;
  is_red_flag: boolean;
}

interface ScreeningQuestionnaireProps {
  conditionId: string;
  conditionName: string;
  onBack: () => void;
  onComplete: () => void;
}

export function ScreeningQuestionnaire({
  conditionId,
  conditionName,
  onBack,
  onComplete,
}: ScreeningQuestionnaireProps) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [showChildInfo, setShowChildInfo] = useState(true);
  const [language] = useState<'es' | 'en'>('es');

  useEffect(() => {
    loadQuestions();
  }, [conditionId]);

  async function loadQuestions() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select('id, question_en, question_es, order_index, weight, is_red_flag')
        .eq('condition_id', conditionId)
        .order('order_index');

      if (error) throw error;

      const formattedQuestions: Question[] = (data || []).map((q) => ({
        id: q.id,
        question: language === 'es' ? q.question_es : q.question_en,
        order_index: q.order_index,
        weight: q.weight,
        is_red_flag: q.is_red_flag,
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleStartScreening = () => {
    if (!childName.trim() || !childAge.trim()) {
      alert('Por favor completa toda la información del niño');
      return;
    }
    setShowChildInfo(false);
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const totalScore = Object.entries(answers).reduce((sum, [questionId, answer]) => {
        const question = questions.find((q) => q.id === questionId);
        if (question) {
          return sum + answer * question.weight;
        }
        return sum;
      }, 0);

      const maxPossibleScore = questions.reduce((sum, q) => sum + 3 * q.weight, 0);
      const percentageScore = (totalScore / maxPossibleScore) * 100;

      const redFlags = questions.filter(
        (q) => q.is_red_flag && answers[q.id] >= 2
      ).length;

      const { error } = await supabase.from('screening_sessions').insert({
        user_id: user.id,
        child_name: childName,
        child_age: parseInt(childAge),
        condition_type: conditionName,
        scores: {
          total: totalScore,
          percentage: percentageScore,
          red_flags: redFlags,
          answers: answers,
        },
        recommendations: generateRecommendations(percentageScore, redFlags),
      });

      if (error) throw error;

      onComplete();
    } catch (error) {
      console.error('Error saving screening:', error);
      alert('Error al guardar los resultados');
    } finally {
      setSaving(false);
    }
  };

  function generateRecommendations(score: number, redFlags: number) {
    const recs = [];

    if (redFlags > 0) {
      recs.push('Se detectaron señales de alerta. Se recomienda consulta con profesional.');
    }

    if (score > 70) {
      recs.push('Los resultados sugieren evaluación profesional inmediata.');
    } else if (score > 50) {
      recs.push('Se recomienda seguimiento y consulta con especialista.');
    } else if (score > 30) {
      recs.push('Monitoreo continuo recomendado.');
    } else {
      recs.push('Desarrollo dentro de parámetros esperados.');
    }

    return recs;
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No hay preguntas disponibles para esta evaluación</p>
          <button
            onClick={onBack}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (showChildInfo) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {conditionName}
        </h2>
        <p className="text-gray-600 mb-6">
          Información del niño para la evaluación
        </p>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del niño
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad (en meses)
            </label>
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 36"
              min="0"
              max="216"
            />
          </div>

          <button
            onClick={handleStartScreening}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Comenzar Evaluación
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Este cuestionario tiene {questions.length} preguntas y toma aproximadamente 5-10 minutos.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {[
            { value: 0, label: 'Nunca', color: 'green' },
            { value: 1, label: 'Raramente', color: 'blue' },
            { value: 2, label: 'A veces', color: 'yellow' },
            { value: 3, label: 'Frecuentemente', color: 'red' },
          ].map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;
            const colorClasses = {
              green: 'border-green-500 bg-green-50',
              blue: 'border-blue-500 bg-blue-50',
              yellow: 'border-yellow-500 bg-yellow-50',
              red: 'border-red-500 bg-red-50',
            };

            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? colorClasses[option.color as keyof typeof colorClasses]
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option.label}</span>
                  {isSelected && <Check className="w-5 h-5 text-gray-700" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          disabled={saving}
        >
          <ArrowLeft className="w-5 h-5" />
          {currentQuestionIndex === 0 ? 'Cancelar' : 'Anterior'}
        </button>

        {isLastQuestion && allQuestionsAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Finalizar
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
            disabled={answers[currentQuestion.id] === undefined}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {currentQuestion.is_red_flag && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Esta pregunta es una señal de alerta importante
          </p>
        </div>
      )}
    </div>
  );
}
