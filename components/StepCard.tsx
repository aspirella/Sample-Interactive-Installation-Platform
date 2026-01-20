
import React, { useState } from 'react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  onBack: () => void;
  onComplete: (id: string) => void;
  onNext: () => void;
  isCompleted: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ 
  step, 
  onBack, 
  onComplete, 
  onNext, 
  isCompleted,
  hasPrevious,
  hasNext
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Hero Visual */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
        <img 
          src={step.imageUrl} 
          alt={step.title} 
          className="w-full h-full object-cover opacity-90"
        />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h2>
          <p className="text-slate-600 leading-relaxed">{step.fullDesc}</p>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h4 className="text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.336 16.336a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM16 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
            </svg>
            Pro Tips
          </h4>
          <ul className="space-y-2">
            {step.tips.map((tip, idx) => (
              <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span> {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specs Toggle */}
        <div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full py-3 border-y border-slate-100 text-slate-700 font-medium"
          >
            Technical Details & Tools
            <svg className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDetails && (
            <div className="py-4 space-y-4 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-4">
                {step.specs?.map((spec, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">{spec.label}</div>
                    <div className="text-sm font-semibold text-slate-700">{spec.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">Required Tools</div>
                <div className="flex flex-wrap gap-2">
                  {step.tools.map((tool, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-md shadow-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 flex gap-3 mt-auto">
        <button 
          disabled={isCompleted}
          onClick={() => onComplete(step.id)}
          className={`flex-1 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
            isCompleted 
            ? 'bg-green-100 text-green-600 border border-green-200 cursor-default' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          {isCompleted ? '✓ Step Completed' : 'Mark as Complete'}
        </button>
        {isCompleted && hasNext && (
          <button 
            onClick={onNext}
            className="bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Next
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default StepCard;
