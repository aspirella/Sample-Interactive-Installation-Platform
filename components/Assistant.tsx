
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { Step } from '../types';

interface AssistantProps {
  currentStep: Step | null;
}

const Assistant: React.FC<AssistantProps> = ({ currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const gemini = useRef(new GeminiService());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await gemini.current.troubleshoot(userMsg, currentStep);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100]"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 left-6 sm:left-auto sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-[100] animate-in fade-in zoom-in-95 duration-200" style={{ maxHeight: '70vh' }}>
          <div className="bg-slate-900 p-4 text-white">
            <h3 className="font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI Support Assistant
            </h3>
            <p className="text-[10px] text-slate-400 opacity-80 uppercase tracking-widest mt-1">Context: {currentStep?.title || 'General Help'}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                How can I help you with this installation? Ask about torque, wiring, or safety.
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none border border-slate-200 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;
