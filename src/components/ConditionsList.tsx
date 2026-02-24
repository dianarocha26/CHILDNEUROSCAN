import { useState } from 'react';
import { Info, ExternalLink } from 'lucide-react';

interface ConditionInfo {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  redFlags: string[];
  resources: string[];
}

const conditionsData: ConditionInfo[] = [
  {
    id: 'autism',
    name: 'Autismo (TEA)',
    description: 'El Trastorno del Espectro Autista es una condición del neurodesarrollo que afecta la comunicación social y el comportamiento.',
    symptoms: [
      'Dificultad en la comunicación social',
      'Patrones de comportamiento repetitivos',
      'Intereses restringidos',
      'Sensibilidad sensorial',
    ],
    redFlags: [
      'No responde a su nombre a los 12 meses',
      'Evita contacto visual',
      'Retraso en el desarrollo del lenguaje',
      'Movimientos repetitivos',
    ],
    resources: [
      'Asociación de Autismo',
      'Terapia ABA',
      'Grupos de apoyo para padres',
    ],
  },
  {
    id: 'adhd',
    name: 'TDAH',
    description: 'Trastorno por Déficit de Atención e Hiperactividad caracterizado por inatención, hiperactividad e impulsividad.',
    symptoms: [
      'Dificultad para mantener la atención',
      'Hiperactividad motora',
      'Impulsividad',
      'Dificultad para seguir instrucciones',
    ],
    redFlags: [
      'No puede estar quieto',
      'Interrumpe constantemente',
      'Dificultad para esperar su turno',
      'Olvida actividades diarias',
    ],
    resources: [
      'Terapia conductual',
      'Técnicas de organización',
      'Apoyo escolar',
    ],
  },
  {
    id: 'speech-delay',
    name: 'Retraso del Habla',
    description: 'Desarrollo más lento de lo esperado en las habilidades del lenguaje y comunicación.',
    symptoms: [
      'Vocabulario limitado para su edad',
      'Dificultad para formar oraciones',
      'Problemas de pronunciación',
      'Frustración al comunicarse',
    ],
    redFlags: [
      'No dice palabras a los 15 meses',
      'No usa frases a los 2 años',
      'Difícil de entender a los 3 años',
    ],
    resources: [
      'Terapia del lenguaje',
      'Ejercicios en casa',
      'Estimulación temprana',
    ],
  },
  {
    id: 'developmental-delay',
    name: 'Retraso del Desarrollo',
    description: 'Progreso más lento en alcanzar hitos del desarrollo en diferentes áreas.',
    symptoms: [
      'Retraso motor',
      'Retraso cognitivo',
      'Retraso social',
      'Dificultades de aprendizaje',
    ],
    redFlags: [
      'No se sienta a los 9 meses',
      'No camina a los 18 meses',
      'No juega con otros niños',
    ],
    resources: [
      'Evaluación del desarrollo',
      'Intervención temprana',
      'Terapias múltiples',
    ],
  },
];

export function ConditionsList() {
  const [selectedCondition, setSelectedCondition] = useState<ConditionInfo | null>(null);

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
            {conditionsData.map((condition) => (
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Síntomas Comunes
                    </h4>
                    <ul className="space-y-1 ml-4">
                      {selectedCondition.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Señales de Alerta
                    </h4>
                    <ul className="space-y-1 ml-4">
                      {selectedCondition.redFlags.map((flag, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {flag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Recursos y Apoyo
                    </h4>
                    <ul className="space-y-1 ml-4">
                      {selectedCondition.resources.map((resource, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                          <ExternalLink className="w-3 h-3" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
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
