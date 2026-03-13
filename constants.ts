import { QuizQuestion } from './types';

export const TOV_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Quale elemento del Tono di Voce influisce maggiormente sulla percezione di 'urgenza'?",
    options: ["Volume", "Ritmo", "Pausa", "Intonazione"],
    correctAnswer: 1,
    explanation: "Un ritmo incalzante e veloce comunica urgenza e dinamismo, mentre un ritmo lento comunica calma o solennità."
  },
  {
    id: 2,
    question: "Se un brand vuole apparire 'lussuoso', come dovrebbe usare le pause?",
    options: ["Non usarle mai", "Usarle frequentemente per enfatizzare", "Usarle a caso", "Usare solo frasi brevi"],
    correctAnswer: 1,
    explanation: "Nel lusso, la pausa serve a dare peso alle parole, creando un senso di esclusività e importanza."
  },
  {
    id: 3,
    question: "Un tono di voce 'Istituzionale' si caratterizza solitamente per:",
    options: ["Uso frequente di emoji", "Sintassi complessa e precisione terminologica", "Slang giovanile", "Punti esclamativi multipli"],
    correctAnswer: 1,
    explanation: "Il tono istituzionale punta sulla credibilità e l'autorevolezza attraverso un linguaggio preciso e formale."
  },
  {
    id: 4,
    question: "Cosa si intende per 'Volume' nel tono di voce digitale?",
    options: ["I decibel delle casse", "La dimensione del font", "L'impatto visivo e l'assertività del copy", "La lunghezza del testo"],
    correctAnswer: 2,
    explanation: "Il volume digitale riguarda quanto il brand 'alza la voce' attraverso l'uso di maiuscole, grassetti o parole forti."
  }
];

export const NLP_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Un cliente dice: 'Non mi è chiaro il quadro generale'. Quale sistema rappresentazionale sta usando?",
    options: ["Uditivo", "Cinestesico", "Visivo", "Digitale"],
    correctAnswer: 2,
    explanation: "'Quadro generale', 'chiaro' sono predicati visivi."
  },
  {
    id: 2,
    question: "Quale frase è più adatta a un pubblico Cinestesico?",
    options: ["Ascolta questa offerta", "Guarda che colori brillanti", "Tocca con mano la qualità", "Immagina il futuro"],
    correctAnswer: 2,
    explanation: "'Toccare con mano', 'sentire', 'afferrare' sono tipici del sistema cinestesico (tatto/emozione)."
  }
];

export const COLORS_INFO = [
  { color: "Blu", emotion: "Fiducia, Sicurezza, Calma", risks: "Freddezza, Distacco", hex: "bg-blue-600" },
  { color: "Rosso", emotion: "Passione, Urgenza, Energia", risks: "Aggressività, Pericolo", hex: "bg-red-600" },
  { color: "Verde", emotion: "Natura, Crescita, Salute", risks: "Noia, Stagnazione", hex: "bg-green-600" },
  { color: "Giallo", emotion: "Ottimismo, Felicità", risks: "Ansia, Irritazione", hex: "bg-yellow-400" },
  { color: "Nero", emotion: "Lusso, Eleganza, Autorità", risks: "Lutto, Oppressione", hex: "bg-black" },
];
