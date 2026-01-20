
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  progress: number;
}

const Layout: React.FC<LayoutProps> = ({ children, title, progress }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">HG</span>
            {title}
          </h1>
          <div className="text-sm font-medium text-blue-600">{Math.round(progress)}% Complete</div>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Navigation for small screens is handled within views, but a bottom persistent helper could go here */}
    </div>
  );
};

export default Layout;
