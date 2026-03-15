import { useState } from 'react';
import { motion } from 'framer-motion';
import { flashcards } from '../data';
import { RotateCcw } from 'lucide-react';

export default function Flashcards() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {flashcards.map((card) => (
        <div 
          key={card.id} 
          className="relative w-full h-64 perspective-1000 cursor-pointer group"
          onClick={() => toggleFlip(card.id)}
        >
          <motion.div
            className="w-full h-full relative preserve-3d duration-500"
            animate={{ rotateY: flipped[card.id] ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white border-4 border-blue-600 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* City Skyline Background for Card */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full fill-current text-blue-900">
                  <path d="M0,30 L0,20 L10,20 L10,15 L20,15 L20,25 L30,25 L30,10 L40,10 L40,20 L50,20 L50,5 L60,5 L60,18 L70,18 L70,8 L80,8 L80,22 L90,22 L90,12 L100,12 L100,30 Z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 text-blue-400 group-hover:text-blue-600 transition-colors z-10">
                <RotateCcw size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center text-red-600 mb-3 z-10 relative">{card.title}</h3>
              <p className="text-gray-600 text-center text-xs z-10 relative">Toca para ver el significado</p>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full backface-hidden bg-blue-600 text-white border-4 border-yellow-400 rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg overflow-hidden" style={{ transform: 'rotateY(180deg)' }}>
              {/* City Skyline Background for Card Back */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full fill-current text-blue-900">
                  <path d="M0,30 L0,20 L10,20 L10,15 L20,15 L20,25 L30,25 L30,10 L40,10 L40,20 L50,20 L50,5 L60,5 L60,18 L70,18 L70,8 L80,8 L80,22 L90,22 L90,12 L100,12 L100,30 Z" />
                </svg>
              </div>
              <div className="overflow-y-auto w-full h-full flex flex-col justify-center custom-scrollbar pr-1 z-10 relative">
                <p className="text-xs font-medium mb-2 text-yellow-200">{card.concept}</p>
                <p className="text-sm font-bold leading-snug">{card.key}</p>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
