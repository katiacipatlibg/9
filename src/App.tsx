/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, HelpCircle, FileText, Bot, Shield } from 'lucide-react';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Cases from './components/Cases';
import Assistant from './components/Assistant';

type Tab = 'flashcards' | 'quiz' | 'cases' | 'assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('flashcards');

  const tabs = [
    { id: 'flashcards', label: 'Tarjetas', icon: BookOpen },
    { id: 'quiz', label: 'Examen', icon: HelpCircle },
    { id: 'cases', label: 'Casos', icon: FileText },
    { id: 'assistant', label: 'Asistente', icon: Bot },
  ] as const;

  return (
    <div 
      className="min-h-screen font-sans pb-16 relative overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop")' }}
    >
      {/* Blue Overlay to keep the Superman theme */}
      <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply -z-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-super-blue/80 to-blue-300/90 -z-30"></div>

      {/* Sun / Sky elements */}
      <div className="fixed top-10 right-10 w-48 h-48 bg-super-yellow rounded-full opacity-90 shadow-[0_0_60px_30px_rgba(252,209,22,0.6)] -z-20"></div>
      
      {/* Emoji City Decorations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-50">
        {[
          { emoji: '🏙️', top: '15%', left: '5%', size: 'text-6xl', delay: 0 },
          { emoji: '🏢', top: '20%', left: '85%', size: 'text-7xl', delay: 1 },
          { emoji: '🏦', top: '45%', left: '10%', size: 'text-5xl', delay: 2 },
          { emoji: '🏤', top: '55%', left: '82%', size: 'text-8xl', delay: 0.5 },
          { emoji: '🏬', top: '75%', left: '8%', size: 'text-6xl', delay: 1.5 },
          { emoji: '🏨', top: '12%', left: '45%', size: 'text-5xl', delay: 2.5 },
          { emoji: '🏙️', top: '80%', left: '65%', size: 'text-7xl', delay: 0.8 },
          { emoji: '🏢', top: '35%', left: '90%', size: 'text-5xl', delay: 1.2 },
          { emoji: '🏫', top: '30%', left: '20%', size: 'text-6xl', delay: 0.3 },
          { emoji: '🏥', top: '65%', left: '25%', size: 'text-5xl', delay: 1.8 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} drop-shadow-2xl`}
            style={{ top: item.top, left: item.left }}
            animate={{ y: [0, -15, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      {/* City Skyline Background */}
      <div className="fixed bottom-0 left-0 w-full h-[50vh] -z-10 pointer-events-none flex items-end opacity-60">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full text-gray-900 fill-current">
          {/* Back layer */}
          <path opacity="0.7" d="M0,300 L0,200 L40,200 L40,150 L90,150 L90,220 L150,220 L150,100 L210,100 L210,180 L260,180 L260,80 L320,80 L320,190 L380,190 L380,120 L450,120 L450,210 L510,210 L510,90 L580,90 L580,170 L640,170 L640,60 L710,60 L710,200 L770,200 L770,110 L840,110 L840,230 L900,230 L900,140 L960,140 L960,190 L1020,190 L1020,130 L1090,130 L1090,210 L1150,210 L1150,160 L1200,160 L1200,300 Z" />
          {/* Front layer with Daily Planet globe */}
          <path d="M0,300 L0,250 L60,250 L60,180 L120,180 L120,260 L180,260 L180,150 L240,150 L240,230 L300,230 L300,110 L360,110 L360,240 L420,240 L420,160 L480,160 L480,270 L540,270 L540,130 L600,130 L600,220 L660,220 L660,90 L730,90 L730,250 L790,250 L790,170 L860,170 L860,280 L920,280 L920,150 L980,150 L980,240 L1050,240 L1050,180 L1110,180 L1110,260 L1170,260 L1170,200 L1200,200 L1200,300 Z" />
          {/* Daily Planet Globe */}
          <circle cx="570" cy="110" r="18" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M552,110 L588,110 M570,92 L570,128" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="570" cy="110" rx="18" ry="6" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(20 570 110)" />
        </svg>
      </div>

      {/* Superman Logo Watermark */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none -z-20 text-white">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 50 95 L 10 30 L 30 10 L 70 10 L 90 30 Z" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M 50 85 L 18 32 L 34 16 L 66 16 L 82 32 Z" fill="currentColor" />
          <path d="M 35 25 Q 50 20 65 25 Q 70 35 60 45 Q 50 55 40 45 Q 30 35 35 25 Z" fill="transparent" />
          <path d="M 45 30 L 55 30 L 50 40 Z" fill="currentColor" />
        </svg>
      </div>

      <header className="pt-8 pb-12 px-4 text-center relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-super-yellow p-4 rounded-full shadow-lg border-4 border-super-red transform hover:rotate-12 transition-transform">
            <Shield size={48} className="text-super-blue" fill="currentColor" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-md tracking-tight uppercase">
          Metrópolis Academy
        </h1>
        <p className="text-blue-100 mt-2 text-lg font-medium max-w-2xl mx-auto drop-shadow">
          Los Efectos de la Familia sobre el Aprendizaje Infantil
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md max-w-fit mx-auto border-2 border-super-blue/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-super-red text-white shadow-lg transform scale-105' 
                    : 'text-super-blue hover:bg-blue-50'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-4 md:p-8 min-h-[60vh] border-t-8 border-super-yellow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'flashcards' && <Flashcards />}
              {activeTab === 'quiz' && <Quiz />}
              {activeTab === 'cases' && <Cases />}
              {activeTab === 'assistant' && <Assistant />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Watermark */}
      <footer className="fixed bottom-0 w-full py-4 text-center z-50 pointer-events-none">
        <p className="text-white font-black text-xl opacity-70 uppercase tracking-widest drop-shadow-lg">
          Miss Karu
        </p>
      </footer>
    </div>
  );
}
