import React from 'react';
import { View } from '../types';
import { motion } from 'motion/react';

interface Props {
  onChangeView: (view: View) => void;
}

const Home: React.FC<Props> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6 max-w-3xl"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-20 h-20 bg-brand-blue rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform rotate-3 mb-10 relative z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M20 5L35 30H5L20 5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 15L28 28H12L20 15Z" fill="currentColor" fillOpacity="0.3"/>
            </svg>
          </motion.div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-brand-blue/20 rounded-2xl transform -rotate-6 blur-xl"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
          BRAND IDENTITY <span className="text-brand-blue">LAB</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto font-light">
          L'arte della coerenza strategica tra <span className="font-medium text-slate-900">Tono di Voce</span>, 
          <span className="font-medium text-slate-900"> PNL</span> e <span className="font-medium text-slate-900">Psicologia del Colore</span>.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid gap-6 w-full max-w-lg"
      >
        <button 
          onClick={() => onChangeView(View.TOV)}
          className="group relative w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-blue p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-left flex items-center justify-between overflow-hidden"
        >
          <div className="relative z-10">
            <span className="block text-xs font-bold text-brand-blue uppercase tracking-[0.2em] mb-2">Percorso Formativo</span>
            <span className="text-2xl font-bold text-slate-900">Studente / Laboratorio</span>
          </div>
          <span className="text-3xl group-hover:translate-x-2 transition-transform relative z-10">→</span>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-blue/5 rounded-full transform translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
        </button>

        <button 
          onClick={() => onChangeView(View.TEACHER)}
          className="w-full text-slate-400 font-medium hover:text-brand-blue py-4 transition-colors text-sm uppercase tracking-widest"
        >
          Accesso Modalità Docente
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 pt-8 border-t border-slate-200 w-full max-w-2xl"
      >
        <p className="text-sm text-slate-500 font-serif italic leading-relaxed">
          "La reputazione nasce dalla coerenza tra ciò che il brand dice, come lo dice e come si presenta."
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
