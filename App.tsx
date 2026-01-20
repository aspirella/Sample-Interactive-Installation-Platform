
import React, { useState, useEffect } from 'react';
import { Step, StepStatus } from './types';
import { INSTALLATION_STEPS } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StepCard from './components/StepCard';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(INSTALLATION_STEPS);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [isProjectFinished, setIsProjectFinished] = useState(false);

  const currentStep = steps.find(s => s.id === currentStepId) || null;
  const progress = (completedStepIds.length / steps.length) * 100;

  const handleSelectStep = (id: string) => {
    setCurrentStepId(id);
    setSteps(prev => prev.map(s => 
      s.id === id && s.status === StepStatus.PENDING 
        ? { ...s, status: StepStatus.IN_PROGRESS } 
        : s
    ));
  };

  const handleCompleteStep = (id: string) => {
    if (completedStepIds.includes(id)) return;
    
    setCompletedStepIds(prev => {
      const newList = [...prev, id];
      if (newList.length === steps.length) {
        setIsProjectFinished(true);
      }
      return newList;
    });

    setSteps(prev => prev.map(s => 
      s.id === id ? { ...s, status: StepStatus.COMPLETED } : s
    ));
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);
    if (currentIndex < steps.length - 1) {
      handleSelectStep(steps[currentIndex + 1].id);
    } else {
      setCurrentStepId(null);
    }
  };

  const currentIndex = steps.findIndex(s => s.id === currentStepId);

  if (isProjectFinished && !currentStepId) {
    return (
      <Layout title="Installation Complete" progress={100}>
        <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Excellent Work!</h2>
          <p className="text-slate-600 max-w-md">
            The installation is complete and verified. Your professional approach ensures system longevity and safety.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-widest">Milestones Reached</h4>
            <div className="flex justify-center gap-4">
              <div className="group relative">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">🏆</div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Expert Builder</div>
              </div>
              <div className="group relative">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">⚡</div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Speed Demon</div>
              </div>
              <div className="group relative">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">🛡️</div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Safety First</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              setCompletedStepIds([]);
              setCurrentStepId(null);
              setIsProjectFinished(false);
              setSteps(INSTALLATION_STEPS);
            }}
            className="text-blue-600 font-semibold hover:underline"
          >
            Reset & Restart Guide
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Installation Manual" progress={progress}>
      {currentStep ? (
        <StepCard 
          step={currentStep}
          onBack={() => setCurrentStepId(null)}
          onComplete={handleCompleteStep}
          onNext={handleNext}
          isCompleted={completedStepIds.includes(currentStep.id)}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < steps.length - 1}
        />
      ) : (
        <Dashboard 
          steps={steps} 
          onSelectStep={handleSelectStep}
          completedStepIds={completedStepIds}
        />
      )}
      
      <Assistant currentStep={currentStep} />
    </Layout>
  );
};

export default App;
