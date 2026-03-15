import { useState } from 'react';
import { cases } from '../data';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function Cases() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const checkAnswer = (questionId: number) => {
    if (answers[questionId] !== undefined) {
      setShowResults(prev => ({ ...prev, [questionId]: true }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8 flex items-center space-x-4">
        <div className="bg-yellow-400 p-3 rounded-full text-blue-900">
          <HelpCircle size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Casos de Estudio</h2>
          <p className="text-blue-100">Analiza cada situación práctica y selecciona la mejor respuesta basada en los conceptos estudiados.</p>
        </div>
      </div>

      <div className="space-y-8">
        {cases.map((c, index) => (
          <div key={c.id} className="bg-white border-l-8 border-red-600 rounded-r-2xl p-6 shadow-md">
            <div className="mb-4">
              <span className="inline-block bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-sm mb-3">
                Caso {index + 1}
              </span>
              <h3 className="text-lg font-medium text-gray-800 leading-relaxed">
                {c.question}
              </h3>
            </div>
            
            <div className="space-y-3 mt-6">
              {c.options.map((opt, optIdx) => {
                const isSelected = answers[c.id] === optIdx;
                const isCorrect = c.answer === optIdx;
                const isRevealed = showResults[c.id];
                const showCorrect = isRevealed && isCorrect;
                const showIncorrect = isRevealed && isSelected && !isCorrect;

                let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
                
                if (showCorrect) {
                  btnClass += "bg-green-100 border-green-500 text-green-800";
                } else if (showIncorrect) {
                  btnClass += "bg-red-100 border-red-500 text-red-800";
                } else if (isSelected) {
                  btnClass += "bg-blue-100 border-blue-500 text-blue-800";
                } else {
                  btnClass += "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(c.id, optIdx)}
                    disabled={isRevealed}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showCorrect && <CheckCircle2 className="text-green-500" size={20} />}
                      {showIncorrect && <XCircle className="text-red-500" size={20} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showResults[c.id] && answers[c.id] !== undefined && (
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => checkAnswer(c.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-full shadow transition-colors"
                >
                  Comprobar
                </button>
              </div>
            )}
            
            {showResults[c.id] && (
              <div className={`mt-6 p-4 rounded-xl ${answers[c.id] === c.answer ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                <p className="font-bold">
                  {answers[c.id] === c.answer ? '¡Excelente deducción!' : 'Respuesta incorrecta. Revisa los conceptos.'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
