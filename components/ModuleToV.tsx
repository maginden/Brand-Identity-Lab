import React, { useState } from 'react';
import { Card, Button, Spinner, TextToSpeechButton } from './Shared';
import { TOV_QUIZ } from '../constants';
import { rewriteTextToV } from '../services/geminiService';
import { UserProgress } from '../types';

interface Props {
  onComplete: (score: number) => void;
  progress: UserProgress;
}

const ModuleToV: React.FC<Props> = ({ onComplete, progress }) => {
  const [step, setStep] = useState<'theory' | 'vocal-lab' | 'quiz' | 'practice'>('theory');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Vocal Lab State
  const [labText, setLabText] = useState("Benvenuti nel laboratorio Veravox. Qui esploriamo il potere della voce.");
  const [labTone, setLabTone] = useState("Istituzionale");

  // Practice State
  const [inputText, setInputText] = useState("Il nostro servizio clienti è disponibile dalle 9 alle 18.");
  const [selectedTone, setSelectedTone] = useState("Empatico");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const currentQ = TOV_QUIZ[quizIndex];
    if (optionIndex === currentQ.correctAnswer) {
      setScore(s => s + 10);
      setFeedback(`Corretto! ${currentQ.explanation}`);
    } else {
      setFeedback(`Sbagliato. ${currentQ.explanation}`);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (quizIndex < TOV_QUIZ.length - 1) {
      setQuizIndex(i => i + 1);
    } else {
      setStep('practice');
    }
  };

  const handleRewrite = async () => {
    setLoading(true);
    try {
      const result = await rewriteTextToV(inputText, selectedTone);
      setAiResult(result);
    } catch (e) {
      setAiResult("Errore di connessione. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-blue">Modulo 1: Tono di Voce</h2>
        <span className="text-sm font-medium bg-brand-blueLight text-brand-blue px-3 py-1 rounded-full">
          Punti: {score + progress.tovScore}
        </span>
      </div>

      {step === 'theory' && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">I 4 Pilastri del Tono di Voce</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-brand-blue">
              <span className="font-bold block text-brand-blue">Volume</span>
              Quanto "forte" parla il brand? È discreto o urla per farsi notare? In digitale si traduce in grassetti, maiuscole e assertività.
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-brand-blue">
              <span className="font-bold block text-brand-blue">Ritmo</span>
              La velocità del discorso. Veloce = dinamismo/urgenza. Lento = calma/riflessione. Frasi brevi vs periodi complessi.
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-brand-blue">
              <span className="font-bold block text-brand-blue">Pausa</span>
              Il silenzio è potente. Le pause creano attesa ed enfasi. In un testo, sono i ritorni a capo e la punteggiatura.
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-brand-blue">
              <span className="font-bold block text-brand-blue">Intonazione</span>
              La "melodia" della voce. Può essere monotona (autorevole/robotica) o variata (espressiva/amichevole).
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Profili di Tono Comuni</h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl">🎩</div>
              <div>
                <p className="font-bold text-blue-900">Luxury / Esclusivo</p>
                <p className="text-sm text-blue-800">Lento, distaccato, usa parole ricercate. Non cerca di convincere, ma di sedurre.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
              <div className="text-2xl">🤝</div>
              <div>
                <p className="font-bold text-orange-900">Empatico / Caldo</p>
                <p className="text-sm text-orange-800">Ritmo medio, intonazione variata, usa il "noi" e il "tu". Vicino all'utente.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
              <div className="text-2xl">⚡</div>
              <div>
                <p className="font-bold text-red-900">Energico / Urgente</p>
                <p className="text-sm text-red-800">Ritmo veloce, frasi brevi, verbi all'imperativo. Spinge all'azione immediata.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic">Scorri per approfondire</p>
            <Button onClick={() => setStep('vocal-lab')}>Prova il Vocal Lab</Button>
          </div>
        </Card>
      )}

      {step === 'vocal-lab' && (
        <Card className="bg-slate-900 text-white border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xl">🎙️</span>
            </div>
            <h3 className="text-xl font-bold">Vocal Lab: Ascolta la Differenza</h3>
          </div>
          
          <p className="text-slate-400 mb-6">
            Il tono di voce non è solo ciò che scrivi, ma come "suona" nella mente del lettore. 
            Usa il sintetizzatore per sentire come cambiano ritmo e intonazione.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Testo da testare</label>
              <input 
                type="text" 
                value={labText}
                onChange={(e) => setLabText(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Seleziona Tono</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Luxury", "Empatico", "Energico", "Istituzionale"].map(t => (
                  <button
                    key={t}
                    onClick={() => setLabTone(t)}
                    className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      labTone === t 
                        ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/40" 
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-800">
            <TextToSpeechButton text={labText} tone={labTone} className="w-full md:w-auto !bg-slate-800 !text-white !border-slate-700" />
            <Button onClick={() => setStep('quiz')}>Inizia il Quiz</Button>
          </div>
        </Card>
      )}

      {step === 'quiz' && (
        <Card>
          <h3 className="text-lg font-medium mb-2">Domanda {quizIndex + 1}/{TOV_QUIZ.length}</h3>
          <p className="text-xl mb-6">{TOV_QUIZ[quizIndex].question}</p>
          <div className="space-y-3">
            {TOV_QUIZ[quizIndex].options.map((opt, idx) => {
              const isAnswered = feedback !== null;
              const isCorrect = idx === TOV_QUIZ[quizIndex].correctAnswer;
              const isSelected = selectedOption === idx;

              let baseClass = "w-full text-left p-4 rounded-lg border transition-all duration-300 relative flex items-center justify-between";
              let stateClass = "bg-white hover:bg-slate-50 border-slate-200";

              if (isAnswered) {
                if (isCorrect) {
                  stateClass = "bg-green-50 border-green-500 text-green-800 shadow-md transform scale-[1.01]";
                  if (isSelected) stateClass += " animate-pulse-green";
                } else if (isSelected) {
                  stateClass = "bg-red-50 border-red-300 text-red-800 opacity-80";
                } else {
                  stateClass = "bg-slate-50 border-slate-200 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleQuizAnswer(idx)}
                  className={`${baseClass} ${stateClass}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && (
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full text-white text-sm animate-check ml-2">
                      ✓
                    </span>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <span className="text-red-500 ml-2">✕</span>
                  )}
                </button>
              );
            })}
          </div>
          {feedback && (
            <div className="mt-6 p-4 bg-brand-sageLight rounded-lg border border-brand-sage animate-slideUp">
              <p className="font-medium">{feedback}</p>
              <div className="mt-4 text-right">
                <Button onClick={nextQuestion}>
                  {quizIndex < TOV_QUIZ.length - 1 ? "Prossima Domanda" : "Vai alla Pratica"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {step === 'practice' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Laboratorio AI: Riscrittura Tono</h3>
            <p className="text-slate-600 mb-4">Osserva come cambia la percezione di un messaggio modificando solo il Tono di Voce.</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Testo Neutro</label>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">Seleziona Tono Target</label>
              <div className="flex gap-2 flex-wrap">
                {["Luxury/Esclusivo", "Empatico/Caldo", "Energico/Urgente", "Istituzionale"].map(tone => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTone === tone 
                        ? "bg-brand-blue text-white" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleRewrite} disabled={loading || !inputText}>
              {loading ? "L'AI sta riscrivendo..." : "Riscrivi con AI"}
            </Button>
          </Card>

          {loading && <Spinner />}

          {aiResult && (
            <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100 relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-brand-blue">Risultato AI:</h4>
                <TextToSpeechButton text={aiResult} tone={selectedTone} />
              </div>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap">
                {aiResult}
              </div>
              <div className="mt-6 pt-6 border-t border-blue-100 text-right">
                 <Button variant="secondary" onClick={() => onComplete(score)}>Concludi Modulo</Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleToV;