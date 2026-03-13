import React, { useState, useEffect } from 'react';
import { Card } from './Shared';
import { simulatePerception } from '../services/geminiService';

const DynamicSim: React.FC = () => {
  const [color, setColor] = useState("Blu Istituzionale");
  const [tone, setTone] = useState("Formale");
  const [perception, setPerception] = useState("Caricamento...");

  // Debounce logic to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(async () => {
      setPerception("Analisi percezione in corso...");
      const res = await simulatePerception(color, tone);
      setPerception(res);
    }, 1000);

    return () => clearTimeout(timer);
  }, [color, tone]);

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

        <h3 className="text-2xl font-bold mb-6 relative z-10">🔮 Simulatore di Percezione Live</h3>
        <p className="text-slate-400 mb-8 relative z-10">Cambia le variabili e osserva come il pubblico percepisce il brand in tempo reale.</p>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Colore Dominante</label>
                    <select 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option>Blu Istituzionale</option>
                        <option>Rosso Acceso</option>
                        <option>Verde Pastello</option>
                        <option>Rosa Shocking</option>
                        <option>Nero Opaco</option>
                        <option>Giallo Elettrico</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tono di Voce</label>
                    <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option>Formale e Distaccato</option>
                        <option>Amichevole e Giocoso</option>
                        <option>Aggressivo e Urgente</option>
                        <option>Lussuoso e Minimal</option>
                        <option>Sarcastico</option>
                    </select>
                </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col justify-center">
                <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-3">Feedback Percezione</h4>
                <p className="text-lg leading-relaxed italic animate-pulse-short">
                    "{perception}"
                </p>
            </div>
        </div>
    </div>
  );
};

export default DynamicSim;
