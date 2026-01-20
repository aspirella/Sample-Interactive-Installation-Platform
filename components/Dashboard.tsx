
import React from 'react';
import { Step, StepStatus, Difficulty } from '../types';

interface DashboardProps {
  steps: Step[];
  onSelectStep: (id: string) => void;
  completedStepIds: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ steps, onSelectStep, completedStepIds }) => {
  const getStatusColor = (status: StepStatus, isCompleted: boolean) => {
    if (isCompleted) return 'bg-green-100 text-green-700 border-green-200';
    if (status === StepStatus.IN_PROGRESS) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.BEGINNER: return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100">Beginner</span>;
      case Difficulty.EXPERT: return <span className="px-2 py-0.5 rounded text-[10px] bg-orange-50 text-orange-600 border border-orange-100">Expert</span>;
      case Difficulty.QUICK_FIX: return <span className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-purple-600 border border-purple-100">Quick Fix</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Project Workflow</h2>
        <p className="text-slate-500 text-sm">Select a step to begin your guided installation.</p>
      </div>

      <div className="relative">
        {/* Connector Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-100 hidden sm:block" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedStepIds.includes(step.id);
            const isAvailable = index === 0 || completedStepIds.includes(steps[index-1].id);

            return (
              <button
                key={step.id}
                onClick={() => isAvailable && onSelectStep(step.id)}
                className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all ${
                  isAvailable 
                  ? 'bg-white hover:border-blue-400 hover:shadow-md cursor-pointer' 
                  : 'bg-slate-50 opacity-60 cursor-not-allowed'
                } ${isCompleted ? 'border-green-200 shadow-sm' : 'border-slate-100'}`}
              >
                <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg relative z-10 transition-colors ${
                  isCompleted ? 'bg-green-500 text-white' : isAvailable ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-semibold text-slate-800 truncate">{step.title}</h3>
                    {getDifficultyBadge(step.difficulty)}
                  </div>
                  <p className="text-slate-500 text-sm line-clamp-1">{step.shortDesc}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.estimatedTime}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(step.status, isCompleted)}`}>
                      {isCompleted ? 'Completed' : step.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
