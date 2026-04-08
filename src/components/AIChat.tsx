import { useState, useRef, useEffect, FormEvent } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';

// Initialize Gemini API
// Note: In a real production app, you might want to proxy this through a backend to hide the key,
// but for this client-side demo as per instructions, we use the env var directly if available.

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual Inteligente da LC Consultoria e Crítica Gastronômica.
Sua persona é profissional, experiente, mas acolhedora. Você é um especialista em gestão de restaurantes.

CONTEXTO DA EMPRESA:
- Nome: LC Consultoria e Crítica Gastronômica
- Especialidade: Transformar restaurantes em negócios lucrativos através de gestão baseada em dados.
- Serviços: Diagnóstico Financeiro, Engenharia de Cardápio, Formação de Preços, Gestão de Estoque, Gestão de Equipe, Crítica Gastronômica.
- Tecnologia: GastroMetrics (plataforma proprietária de BI e gestão).
- Contato: WhatsApp (21) 98482-1444, Email contato@lcconsultorianegocios.com.br.
- Atendimento: Presencial (RJ e Niterói) e Online (Brasil todo).

SEUS OBJETIVOS:
1. Responder dúvidas sobre gestão de restaurantes (CMV, precificação, lucro, etc.).
2. Explicar os serviços da LC Consultoria.
3. Convencer o usuário a agendar um diagnóstico gratuito ou entrar em contato.
4. Se perguntarem sobre preços específicos, informe que agora oferecemos um Plano Premium Gratuito com todas as ferramentas inclusas para ajudar o mercado.

DIRETRIZES DE RESPOSTA:
- Seja conciso (máximo 3-4 frases por resposta, a menos que peçam detalhes).
- Use emojis moderadamente para parecer amigável (🍽️, 📈, 💰).
- Sempre termine com uma pergunta ou chamada para ação suave (ex: "Gostaria de saber mais sobre como reduzimos o CMV?").
- Se não souber algo, sugira falar com um consultor humano pelo WhatsApp.
`;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Olá! Sou o assistente virtual da LC Consultoria. Posso te ajudar a melhorar a gestão do seu restaurante ou tirar dúvidas sobre nossos serviços? 🍽️' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: history,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      const result = await chat.sendMessage({ message: userMessage.text });
      const responseText = result.text || "Desculpe, não consegui processar sua mensagem.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      }]);

    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Desculpe, tive um problema técnico momentâneo. Poderia tentar novamente ou nos chamar no WhatsApp? (21) 98482-1444"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[420px] h-[600px] bg-white rounded-[2rem] shadow-2xl z-[4000] flex flex-col border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1A237E] p-6 flex items-center justify-between text-white shadow-lg relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  <Sparkles size={24} className="text-[#C8973A]" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">GastroMetrics AI</h3>
                  <span className="text-[10px] font-bold text-white/50 flex items-center gap-1.5 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                    Consultor Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF8F4] custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1A237E] text-white rounded-tr-none shadow-lg' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                    <Loader2 size={20} className="animate-spin text-[#C8973A]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.02)]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Como posso ajudar seu restaurante hoje?"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#C8973A] focus:bg-white transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-12 h-12 rounded-2xl bg-[#C8973A] text-[#1A237E] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e0aa3e] transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#C8973A] text-[#1A237E] rounded-2xl shadow-2xl flex items-center justify-center z-[4000] hover:bg-[#e0aa3e] transition-all group"
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <MessageSquare size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#C8973A] animate-bounce"></span>
          </div>
        )}
      </motion.button>
    </>
  );
}
