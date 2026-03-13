import React, { useState } from 'react';
import { Card, Button, Spinner, TextToSpeechButton } from './Shared';
import { NLP_QUIZ } from '../constants';
import { generateNLPCopy } from '../services/geminiService';
import { UserProgress } from '../types';

interface Props {
  onComplete: (score: number) => void;
  progress: UserProgress;
}

const ModuleNLP: React.FC<Props> = ({ onComplete, progress }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'generator'>('learn');
  const [quizScore, setQuizScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Generator state
  const [productName, setProductName] = useState("");
  const [genResult, setGenResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuizAnswer = (idx: number) => {
    setSelectedOption(idx);
    const q = NLP_QUIZ[quizIndex];
    if (idx === q.correctAnswer) {
      setQuizScore(s => s + 10);
      setFeedback("Corretto! " + q.explanation);
    } else {
      setFeedback("Errato. " + q.explanation);
    }
  };

  const handleNext = () => {
    setQuizIndex(i => i + 1); 
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleTabChange = (t: 'learn' | 'quiz' | 'generator') => {
    setActiveTab(t);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateNLPCopy(productName);
      setGenResult(res);
    } catch (e) {
      setGenResult("Errore.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-blue">Modulo 2: PNL & Sistemi Rappresentazionali</h2>
        <span className="text-sm bg-brand-blueLight text-brand-blue px-3 py-1 rounded-full">
          Punti: {quizScore + progress.nlpScore}
        </span>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {['learn', 'quiz', 'generator'].map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t as any)}
            className={`px-4 py-2 font-medium capitalize whitespace-nowrap ${
              activeTab === t ? "text-brand-blue border-b-2 border-brand-blue" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === 'learn' ? 'Teoria VAK' : t === 'quiz' ? 'Quiz Identificazione' : 'Generatore Copy'}
          </button>
        ))}
      </div>

      {activeTab === 'learn' && (
        <Card>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-3xl mb-2">👁️</div>
              <h3 className="font-bold text-lg mb-2">Visivo</h3>
              <p className="text-sm text-slate-600">Pensa per immagini. Parla veloce.</p>
              <div className="mt-3 text-xs bg-white p-2 rounded border text-slate-500">
                Parole chiave: <em>Vedere, chiaro, brillante, prospettiva, immaginare.</em>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="text-3xl mb-2">👂</div>
              <h3 className="font-bold text-lg mb-2">Uditivo</h3>
              <p className="text-sm text-slate-600">Attento ai suoni e alle parole. Ritmico.</p>
              <div className="mt-3 text-xs bg-white p-2 rounded border text-slate-500">
                Parole chiave: <em>Ascoltare, dire, suono, armonia, dissonante.</em>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="text-3xl mb-2">✋</div>
              <h3 className="font-bold text-lg mb-2">Cinestesico</h3>
              <p className="text-sm text-slate-600">Filtra attraverso sensazioni fisiche ed emozioni.</p>
              <div className="mt-3 text-xs bg-white p-2 rounded border text-slate-500">
                Parole chiave: <em>Sentire, toccare, afferrare, caldo, pesante, connessione.</em>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
             <Button onClick={() => handleTabChange('quiz')}>Mettiti alla prova</Button>
          </div>
        </Card>
      )}

      {activeTab === 'quiz' && (
         <Card>
         <h3 className="text-lg font-medium mb-2">Domanda {quizIndex + 1}/{NLP_QUIZ.length}</h3>
         <p className="text-xl mb-6">{NLP_QUIZ[quizIndex].question}</p>
         <div className="grid grid-cols-1 gap-3">
           {NLP_QUIZ[quizIndex].options.map((opt, idx) => {
             const isAnswered = feedback !== null;
             const isCorrect = idx === NLP_QUIZ[quizIndex].correctAnswer;
             const isSelected = selectedOption === idx;

             let stateClass = "bg-white hover:border-brand-blue hover:shadow-md border-slate-200";
             const baseClass = "p-4 rounded-lg border text-left font-medium transition-all duration-300 relative flex justify-between items-center";

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
           <div className="mt-6 p-4 bg-slate-100 rounded-lg animate-slideUp">
             <p>{feedback}</p>
             <div className="mt-4 flex justify-end">
                {quizIndex < NLP_QUIZ.length - 1 ? (
                  <Button onClick={handleNext}>Avanti</Button>
                ) : (
                  <Button variant="secondary" onClick={() => handleTabChange('generator')}>Vai al Generatore</Button>
                )}
             </div>
           </div>
         )}
       </Card>
      )}

      {activeTab === 'generator' && (
        <Card>
          <h3 className="text-xl font-bold mb-4">Generatore Multi-Sensoriale</h3>
          <p className="mb-4 text-slate-600">Inserisci un prodotto e l'AI genererà 3 copy diversi per colpire i 3 canali.</p>
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Es. Scarpe da running, Corso di Yoga..." 
              className="flex-1 p-3 border rounded-lg"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={loading || !productName}>Genera</Button>
          </div>
          
          {loading && <Spinner />}
          
          {genResult && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 prose max-w-none relative">
              <div className="absolute top-4 right-4">
                  <TextToSpeechButton text={genResult} />
              </div>
              <div dangerouslySetInnerHTML={{ 
                // Basic markdown to html conversion for simplicity in this constrained env
                __html: genResult.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') 
              }} />
              <div className="mt-6 text-right">
                <Button variant="secondary" onClick={() => onComplete(quizScore)}>Completa Modulo</Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ModuleNLP;