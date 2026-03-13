import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8 ${className}`}
  >
    {children}
  </motion.div>
);

export const Button: React.FC<{ 
  onClick: () => void; 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  className?: string;
}> = ({ onClick, children, variant = 'primary', disabled = false, className = "" }) => {
  const baseStyle = "px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-blue-800 focus:ring-brand-blue disabled:bg-slate-300 shadow-lg shadow-brand-blue/20",
    secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200 focus:ring-slate-300 disabled:bg-slate-200",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blueLight focus:ring-brand-blue",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/20"
  };

  return (
    <motion.button 
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden border border-slate-200/50">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      className="bg-brand-blue h-full rounded-full transition-all shadow-[0_0_10px_rgba(44,82,130,0.3)]" 
      transition={{ duration: 0.8, ease: "circOut" }}
    ></motion.div>
  </div>
);

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
  </div>
);

/**
 * TextToSpeech Button with Tone Adaptation
 */
export const TextToSpeechButton: React.FC<{ text: string; tone?: string; className?: string }> = ({ text, tone = 'neutral', className = "" }) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const speak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Clean text from markdown/html if any mostly simple strip
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[*_#]/g, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'it-IT';

    // Creative Tone Modulation
    // "Luxury/Esclusivo", "Empatico/Caldo", "Energico/Urgente", "Istituzionale"
    if (tone.toLowerCase().includes('luxury') || tone.toLowerCase().includes('esclusivo')) {
      utterance.rate = 0.85; // Slower
      utterance.pitch = 0.9; // Deeper
    } else if (tone.toLowerCase().includes('energico') || tone.toLowerCase().includes('urgente')) {
      utterance.rate = 1.2; // Faster
      utterance.pitch = 1.1; // Higher energy
    } else if (tone.toLowerCase().includes('empatico') || tone.toLowerCase().includes('caldo')) {
      utterance.rate = 0.95; // Slightly slower
      utterance.pitch = 1.1; // Softer/Higher pitch often perceived as friendlier
    } else {
      // Default / Institutional
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
    }

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  if (!supported) return null;

  return (
    <button 
      onClick={speak}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        speaking 
          ? "bg-red-100 text-red-600 border border-red-200 animate-pulse" 
          : "bg-slate-100 text-slate-600 hover:bg-brand-blueLight hover:text-brand-blue border border-slate-200"
      } ${className}`}
      title="Sintesi Vocale"
    >
      {speaking ? (
        <>
          <span className="text-lg">🔇</span> Stop
        </>
      ) : (
        <>
          <span className="text-lg">🔈</span> Ascolta
        </>
      )}
    </button>
  );
};