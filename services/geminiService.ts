import { GoogleGenAI, Type, Schema } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Model configuration
const TEXT_MODEL = 'gemini-3-flash-preview';

/**
 * Rewrites text based on a specific Tone of Voice
 */
export const rewriteTextToV = async (text: string, tone: string): Promise<string> => {
  try {
    const prompt = `
      Agisci come un esperto copywriter. Riscrivi il seguente testo neutro utilizzando un tono di voce: ${tone}.
      
      Testo originale: "${text}"
      
      Dopo la riscrittura, aggiungi una breve spiegazione (massimo 2 frasi) sul perché le scelte lessicali riflettono quel tono.
      Formatta la risposta con "Testo: [testo]" e "Analisi: [spiegazione]".
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
    });

    return response.text || "Errore nella generazione del testo.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Impossibile connettersi all'AI.");
  }
};

/**
 * Generates copy variations based on NLP systems (VAK)
 */
export const generateNLPCopy = async (product: string): Promise<string> => {
  try {
    const prompt = `
      Crea 3 brevi varianti di copy pubblicitario per il prodotto/servizio: "${product}".
      
      1. Variante VISIVA (usa termini legati alla vista, colori, prospettiva).
      2. Variante UDITIVA (usa termini legati al suono, ritmo, ascolto).
      3. Variante CINESTESICA (usa termini legati al tatto, sensazione, movimento).
      
      Formatta l'output in Markdown chiaro.
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
    });

    return response.text || "Errore nella generazione del copy.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Impossibile generare le varianti NLP.");
  }
};

/**
 * Generates a color palette and explanation for a sector
 */
export const generateSectorPalette = async (sector: string): Promise<{palette: any, explanation: string}> => {
  try {
    const prompt = `
      Sei un esperto di psicologia del colore e branding. 
      Per il settore "${sector}", suggerisci una palette di 3 colori (Primario, Secondario, Accento) in formato HEX.
      Fornisci anche una spiegazione psicologica del perché questi colori funzionano per la reputazione di questo settore.
    `;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        primary: { type: Type.STRING, description: "Codice HEX colore primario" },
        secondary: { type: Type.STRING, description: "Codice HEX colore secondario" },
        accent: { type: Type.STRING, description: "Codice HEX colore accento" },
        explanation: { type: Type.STRING, description: "Spiegazione psicologica della scelta" }
      },
      required: ["primary", "secondary", "accent", "explanation"]
    };

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Risposta vuota");
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Impossibile generare la palette.");
  }
};

/**
 * Evaluates the Final Lab Audit
 */
export const evaluateAudit = async (brandData: any, userAnalysis: string): Promise<string> => {
  try {
    const prompt = `
      Agisci come un docente di Brand Reputation.
      
      Scenario Brand:
      - Settore: ${brandData.sector}
      - Colori: ${brandData.colors}
      - Tono Dichiarato: ${brandData.tone}
      - Copy Reale: "${brandData.copy}"
      - Feedback Pubblico: "${brandData.feedback}"
      
      Analisi dello studente:
      "${userAnalysis}"
      
      Valuta l'analisi dello studente. 
      1. Ha identificato correttamente le incoerenze tra visivo, tono e percezione?
      2. Fornisci un voto da 1 a 10.
      3. Dai un feedback costruttivo e motivazionale.
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
    });

    return response.text || "Errore nella valutazione.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Impossibile valutare l'audit.");
  }
};

/**
 * Simulates public perception dynamically
 */
export const simulatePerception = async (color: string, tone: string): Promise<string> => {
  try {
    const prompt = `
      Simulazione Brand Identity in tempo reale.
      
      Un brand si presenta con:
      - Colore dominante: ${color}
      - Tono di voce: ${tone}
      
      Descrivi in un paragrafo breve (max 50 parole) qual è la percezione immediata del pubblico. C'è coerenza o dissonanza cognitiva? Che emozioni suscita?
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
    });

    return response.text || "Errore nella simulazione.";
  } catch (error) {
     return "Impossibile caricare la simulazione.";
  }
};
