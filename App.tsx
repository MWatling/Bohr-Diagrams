import React from 'react';
import BohrDiagramGenerator from './components/BohrDiagramGenerator';

const GITHUB_URL = "https://github.com/google/genaui";

const Header: React.FC = () => (
  <header className="p-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 flex justify-between items-center sticky top-0 z-20">
    <div className="flex items-center space-x-3">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 2a10 9.488 0 0 1 0 20 10 9.488 0 0 1 0-20z" transform="rotate(45 12 12)"/>
       </svg>
      <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
        Bohr Diagram Generator
      </h1>
    </div>
    <div className="flex items-center gap-2 md:gap-4">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub" className="text-slate-400 hover:text-cyan-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      <Header />
      <main className="p-4 max-w-4xl mx-auto">
          <BohrDiagramGenerator />
      </main>
    </div>
  );
};

export default App;