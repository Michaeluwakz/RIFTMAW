import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Cpu } from 'lucide-react';
import { getArchitectResponse } from '../services/gemini';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const ArchitectChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'I am The Architect. Why do you persist in this flawed reality?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const botResponse = await getArchitectResponse(userMsg);
    
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-900 border border-fuchsia-500/30 w-80 md:w-96 rounded-lg shadow-2xl flex flex-col h-[500px] overflow-hidden">
          {/* Header */}
          <div className="bg-fuchsia-900/20 p-4 border-b border-fuchsia-500/20 flex justify-between items-center">
            <div className="flex items-center">
              <Cpu className="w-5 h-5 text-fuchsia-400 mr-2" />
              <span className="font-display font-bold text-white tracking-wide">THE ARCHITECT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-black/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-fuchsia-900/50 text-white border border-fuchsia-700' 
                    : 'bg-gray-800 text-gray-200 border border-gray-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-fuchsia-400 text-xs px-3 py-2 rounded-lg border border-gray-700 animate-pulse font-mono">
                  COMPUTING_RESPONSE...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-gray-900 border-t border-gray-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the AI..."
              className="flex-grow bg-black border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-fuchsia-500 font-mono placeholder-gray-600"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-fuchsia-700 hover:bg-fuchsia-600 text-white p-2 rounded-md disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
