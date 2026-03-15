import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { flashcards, quiz, cases } from '../data';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `Eres un asistente educativo experto en el tema "Los Efectos de la Familia sobre el Aprendizaje Infantil". 
Tu objetivo es ayudar a los estudiantes a repasar y comprender los conceptos clave.
Responde siempre en español, de forma clara, amigable y motivadora, como si fueras un tutor.
Puedes usar analogías relacionadas con superhéroes (especialmente Superman) para explicar conceptos si es apropiado.

Aquí tienes el contexto del material de estudio:
Flashcards: ${JSON.stringify(flashcards)}
Preguntas de examen: ${JSON.stringify(quiz)}
Casos de estudio: ${JSON.stringify(cases)}

Si el estudiante te hace una pregunta, respóndela basándote en este material.
Si el estudiante te pide que le hagas una pregunta o un caso, selecciona uno del material y preséntalo con sus opciones.`;

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: '¡Hola! Soy tu asistente de estudio kryptoniano. Estoy aquí para ayudarte a dominar el tema de "Los Efectos de la Familia sobre el Aprendizaje Infantil". ¿Tienes alguna duda o quieres que te ponga a prueba con un caso de estudio?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map(m => `${m.role === 'user' ? 'Estudiante' : 'Tutor'}: ${m.content}`).join('\n');
      const prompt = `Historial de conversación:\n${history}\n\nEstudiante: ${userMsg}\nTutor:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      if (response.text) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: response.text! }]);
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: 'Lo siento, hubo una interferencia con la Fortaleza de la Soledad. ¿Podrías intentar de nuevo?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-blue-600">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center space-x-3">
        <div className="bg-red-600 p-2 rounded-full">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-lg">Tutor de Acero</h2>
          <p className="text-xs text-blue-200">Asistente con IA</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-yellow-400 text-blue-900 ml-3' : 'bg-red-600 text-white mr-3'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border-2 border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                <div className="markdown-body prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[80%] flex-row">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white mr-3">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-800 rounded-tl-none shadow-sm flex items-center space-x-2">
                <Loader2 className="animate-spin text-blue-600" size={20} />
                <span className="text-sm text-gray-500">Procesando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Haz una pregunta o pide un caso de estudio..."
            className="flex-1 border-2 border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center transition-colors shadow-md"
          >
            <Send size={20} className={input.trim() && !isLoading ? "ml-1" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
