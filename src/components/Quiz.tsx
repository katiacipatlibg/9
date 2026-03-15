import { useState } from 'react';
import { quiz } from '../data';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {showResults && (
        <div className="bg-yellow-400 border-4 border-red-600 rounded-2xl p-6 text-center shadow-xl sticky top-4 z-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">¡Resultados!</h2>
          <p className="text-xl font-bold text-red-700">
            Obtuviste {calculateScore()} de {quiz.length} correctas.
          </p>
          <button 
            onClick={() => { setAnswers({}); setShowResults(false); window.scrollTo(0,0); }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="space-y-6">
        {quiz.map((q, index) => (
          <div key={q.id} className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              <span className="text-red-600 mr-2">{index + 1}.</span>
              {q.question}
            </h3>
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                const isCorrect = q.answer === optIdx;
                const showCorrect = showResults && isCorrect;
                const showIncorrect = showResults && isSelected && !isCorrect;

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
                    onClick={() => handleSelect(q.id, optIdx)}
                    disabled={showResults}
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
          </div>
        ))}
      </div>

      {!showResults && Object.keys(answers).length > 0 && (
        <div className="flex justify-center pt-6 pb-12">
          <button 
            onClick={() => setShowResults(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all"
          >
            Revisar Respuestas
          </button>
        </div>
      )}
    </div>
  );
}
