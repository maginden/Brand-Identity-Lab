import React, { useState } from 'react';
import { Card, Button, Spinner, TextToSpeechButton } from './Shared';
import { evaluateAudit } from '../services/geminiService';

const BRAND_SCENARIO = {
  sector: "Benessere Olistico / Spa",
  colors: "Rosso Acceso (#FF0000) e Nero",
  tone: "Aggressivo, Urlato, Imperativo",
  copy: "BRUCIA IL GRASSO ORA! NON ESSERE PIGRO! VIENI SUBITO!",
  feedback: "I clienti si sentono giudicati e aggrediti. Dicono che l'ambiente sembra ansiogeno invece che rilassante.",
};

interface Props {
  onReturnHome: () => void;
}

const FinalLab: React.FC<Props> = ({ onReturnHome }) => {
  const [analysis, setAnalysis] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await evaluateAudit(BRAND_SCENARIO, analysis);
      setFeedback(res);
    } catch (e) {
      setFeedback("Errore durante la valutazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-blue">Laboratorio Finale: Audit Reputazionale</h2>
        <p className="text-slate-600 mt-2">Analizza il caso studio e individua le incoerenze nella Brand Identity.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Scenario Card */}
        <Card className="bg-slate-50 border-l-4 border-red-500">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            🚫 Caso Studio: "ZenForce Spa"
          </h3>
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <span className="font-bold block text-slate-900">Settore</span>
              {BRAND_SCENARIO.sector}
            </div>
            <div>
              <span className="font-bold block text-slate-900">Palette Colori</span>
              <div className="flex gap-2 mt-1">
                <div className="w-8 h-8 bg-red-600 rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
              <span className="text-xs">{BRAND_SCENARIO.colors}</span>
            </div>
            <div>
              <span className="font-bold block text-slate-900">Tono di Voce (Copy)</span>
              <p className="italic bg-white p-2 border rounded">"{BRAND_SCENARIO.copy}"</p>
            </div>
            <div>
              <span className="font-bold block text-slate-900">Feedback Pubblico</span>
              "{BRAND_SCENARIO.feedback}"
            </div>
          </div>
        </Card>

        {/* User Input */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold mb-2">La tua Analisi</h3>
            <p className="text-sm text-slate-500 mb-4">
              Identifica l'incoerenza tra il settore (Benessere), i colori (Rosso/Nero) e il tono (Aggressivo). Qual è il rischio reputazionale?
            </p>
            <textarea
              className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none resize-none"
              placeholder="Scrivi qui la tua valutazione..."
              value={analysis}
              onChange={(e) => setAnalysis(e.target.value)}
            ></textarea>
            <div className="mt-4 text-right">
              <Button onClick={handleSubmit} disabled={loading || analysis.length < 10}>
                {loading ? "L'AI sta correggendo..." : "Invia Audit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {feedback && (
        <Card className="bg-brand-sageLight border border-brand-sage animate-slideUp">
          <div className="flex justify-between items-start mb-3">
             <h3 className="text-xl font-bold text-green-900">Valutazione AI</h3>
             <TextToSpeechButton text={feedback} tone="Empatico" />
          </div>
          <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-wrap">
            {feedback}
          </div>
          <div className="mt-6 text-center">
            <Button variant="primary" onClick={onReturnHome}>Torna alla Home</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FinalLab;