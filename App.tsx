import React, { useState } from 'react';
import { View, UserProgress } from './types';
import { ProgressBar, Button } from './components/Shared';
import Home from './components/Home';
import ModuleToV from './components/ModuleToV';
import ModuleNLP from './components/ModuleNLP';
import ModuleColor from './components/ModuleColor';
import FinalLab from './components/FinalLab';
import TeacherMode from './components/TeacherMode';
import DynamicSim from './components/DynamicSim';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [progress, setProgress] = useState<UserProgress>({
    tovScore: 0,
    nlpScore: 0,
    colorScore: 0,
    completedModules: []
  });

  const totalScore = progress.tovScore + progress.nlpScore + progress.colorScore;
  const progressPercent = (progress.completedModules.length / 3) * 100;

  const handleModuleComplete = (module: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      [`${module.toLowerCase()}Score`]: prev[`${module.toLowerCase()}Score` as keyof UserProgress] + score,
      completedModules: Array.from(new Set([...prev.completedModules, module]))
    }));
    
    // Navigate to next logical step
    if (module === 'TOV') setCurrentView(View.NLP);
    else if (module === 'NLP') setCurrentView(View.COLOR);
    else if (module === 'COLOR') setCurrentView(View.LAB);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onChangeView={setCurrentView} />;
      case View.TOV:
        return <ModuleToV onComplete={(s) => handleModuleComplete('TOV', s)} progress={progress} />;
      case View.NLP:
        return <ModuleNLP onComplete={(s) => handleModuleComplete('NLP', s)} progress={progress} />;
      case View.COLOR:
        return <ModuleColor onComplete={(s) => handleModuleComplete('COLOR', s)} progress={progress} />;
      case View.LAB:
        return <FinalLab onReturnHome={() => setCurrentView(View.HOME)} />;
      case View.TEACHER:
        return <TeacherMode onBack={() => setCurrentView(View.HOME)} />;
      case View.SIM:
        return <DynamicSim />;
      default:
        return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800 selection:bg-brand-blue/10">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="font-black text-xl text-slate-900 cursor-pointer flex items-center gap-3 tracking-tighter" 
            onClick={() => setCurrentView(View.HOME)}
          >
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-blue/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M20 5L35 30H5L20 5Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="uppercase">BRAND IDENTITY <span className="text-brand-blue">LAB</span></span>
          </motion.div>
          
          {currentView !== View.HOME && currentView !== View.TEACHER && (
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                 {[
                   { id: View.TOV, label: 'ToV' },
                   { id: View.NLP, label: 'PNL' },
                   { id: View.COLOR, label: 'Color' },
                   { id: View.LAB, label: 'Lab' },
                   { id: View.SIM, label: 'Sim' }
                 ].map((nav) => (
                   <button 
                    key={nav.id}
                    onClick={() => setCurrentView(nav.id)} 
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                      currentView === nav.id 
                        ? 'bg-white text-brand-blue shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                   >
                     {nav.label}
                   </button>
                 ))}
              </nav>
              <div className="bg-brand-blue text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg shadow-brand-blue/20">
                SCORE: {totalScore}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Progress Bar (only in student flow) */}
      {currentView !== View.HOME && currentView !== View.TEACHER && currentView !== View.SIM && (
        <div className="w-full h-1 bg-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-brand-blue shadow-[0_0_10px_rgba(44,82,130,0.5)]"
            transition={{ duration: 1, ease: "circOut" }}
          ></motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Floating Sim Button if not in Sim or Home */}
        {currentView !== View.HOME && currentView !== View.SIM && currentView !== View.TEACHER && (
           <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-8 right-8 z-40"
           >
              <button 
                onClick={() => setCurrentView(View.SIM)}
                className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl hover:bg-brand-blue hover:scale-110 transition-all flex items-center gap-3 group"
                title="Apri Simulatore Live"
              >
                <span className="text-xl group-hover:rotate-12 transition-transform">🔮</span> 
                <span className="hidden md:inline font-black text-xs uppercase tracking-widest">Simulatore Live</span>
              </button>
           </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-slate-200/50 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Brand identity Lab
          </p>
          <p className="text-slate-500 text-sm font-serif italic">
            by Veravox Ai (Indennitate Maria Grazia) - 2026 Educational Interactive App
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;