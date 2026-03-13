import React from 'react';
import { Card, Button } from './Shared';

const TeacherMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-brand-dark">Modalità Docente</h2>
        <Button variant="outline" onClick={onBack}>Esci</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-brand-blue">
          <h3 className="text-xl font-bold mb-4">📊 Obiettivi Didattici</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Comprendere l'impatto psicologico del Tono di Voce.</li>
            <li>Riconoscere i pattern linguistici VAK (Visivo, Auditivo, Cinestesico).</li>
            <li>Associare palette colori a settori merceologici (coerenza).</li>
            <li>Valutare il rischio reputazionale in caso di dissonanza cognitiva.</li>
          </ul>
        </Card>

        <Card className="border-l-4 border-brand-sage">
          <h3 className="text-xl font-bold mb-4">💡 Spunti per la Discussione</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>"Perché un brand di lusso usa raramente il colore giallo?"</li>
            <li>"Analizzate il sito di Apple: è più visivo o cinestesico?"</li>
            <li>"Come cambia la percezione se un'assicurazione usa un tono sarcastico?"</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold mb-4">Simulazione Aula</h3>
        <p className="mb-4">Usa il modulo "Simulatore Live" proiettato in aula per testare combinazioni assurde e chiedere agli studenti di prevedere la reazione.</p>
        <div className="bg-slate-100 p-4 rounded text-center text-slate-500 italic">
          Esempio: "Mettiamo Colore Rosa + Tono Aggressivo per un servizio funebre. Cosa succede?"
        </div>
      </Card>
    </div>
  );
};

export default TeacherMode;
