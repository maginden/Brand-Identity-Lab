import React, { useState } from 'react';
import { Card, Button, Spinner } from './Shared';
import { COLORS_INFO } from '../constants';
import { generateSectorPalette } from '../services/geminiService';
import { UserProgress, ColorPalette } from '../types';

interface Props {
  onComplete: (score: number) => void;
  progress: UserProgress;
}

const ModuleColor: React.FC<Props> = ({ onComplete }) => {
  const [sector, setSector] = useState("");
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setPalette(null);
    try {
      const result = await generateSectorPalette(sector);
      setPalette(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-brand-blue">Modulo 3: Psicologia del Colore</h2>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Teoria: Emozioni e Rischi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COLORS_INFO.map((c) => (
            <div key={c.color} className="bg-white rounded-lg shadow overflow-hidden transform hover:-translate-y-1 transition-transform">
              <div className={`h-20 ${c.hex} w-full`}></div>
              <div className="p-3">
                <h4 className="font-bold mb-1">{c.color}</h4>
                <p className="text-xs text-green-600 mb-1"><strong>+</strong> {c.emotion}</p>
                <p className="text-xs text-red-600"><strong>-</strong> {c.risks}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Palette Generator</h3>
        <p className="text-slate-600 mb-4">L'intelligenza artificiale ti aiuterà a creare una palette coerente per un settore specifico.</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {["Tech Startup", "Luxury Hotel", "Eco-Friendly Food", "Coaching Finanziario", "Fashion Brand"].map(s => (
            <button 
              key={s}
              onClick={() => setSector(s)}
              className={`px-4 py-2 rounded-full border transition-all ${
                sector === s 
                  ? "bg-brand-blue text-white border-brand-blue shadow-lg" 
                  : "bg-white text-slate-600 border-slate-300 hover:border-brand-blue"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
           <Button onClick={handleGenerate} disabled={!sector || loading}>
             {loading ? "Generazione in corso..." : `Genera Palette per "${sector || '...'}"`}
           </Button>
        </div>

        {loading && <Spinner />}

        {palette && (
          <div className="mt-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div 
                  className="h-24 rounded-lg shadow-inner mb-2 flex items-center justify-center text-white font-mono font-bold"
                  style={{ backgroundColor: palette.primary }}
                >
                  {palette.primary}
                </div>
                <span className="text-sm font-semibold text-slate-600">Primario</span>
              </div>
              <div className="text-center">
                <div 
                  className="h-24 rounded-lg shadow-inner mb-2 flex items-center justify-center text-white font-mono font-bold"
                  style={{ backgroundColor: palette.secondary }}
                >
                  {palette.secondary}
                </div>
                <span className="text-sm font-semibold text-slate-600">Secondario</span>
              </div>
              <div className="text-center">
                <div 
                  className="h-24 rounded-lg shadow-inner mb-2 flex items-center justify-center text-white font-mono font-bold"
                  style={{ backgroundColor: palette.accent }}
                >
                  {palette.accent}
                </div>
                <span className="text-sm font-semibold text-slate-600">Accento</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border-l-4 border-brand-blue shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Analisi Psicologica:</h4>
              <p className="text-slate-700 leading-relaxed">{palette.explanation}</p>
            </div>
            <div className="mt-6 text-right">
              <Button variant="outline" onClick={() => onComplete(20)}>Completa Modulo e Vai al Lab</Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ModuleColor;
