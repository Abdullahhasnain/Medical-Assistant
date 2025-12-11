import React, { useState } from 'react';
import { ResearchForm } from './components/ResearchForm';
import { ResearchReport } from './components/ResearchReport';
import { ResearchInput, ResearchOutput } from './types';
import { generateResearch } from './services/geminiService';
import { FlaskConical } from 'lucide-react';

const INITIAL_INPUT: ResearchInput = {
  task_type: 'literature_review',
  domain: '',
  context: '',
  constraints: '',
  deliverable_format: 'markdown',
  citation_style: 'APA'
};

const App: React.FC = () => {
  const [input, setInput] = useState<ResearchInput>(INITIAL_INPUT);
  const [output, setOutput] = useState<ResearchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof ResearchInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateResearch(input);
      setOutput(result);
    } catch (err) {
      setError("An error occurred while generating the research. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AI Research Assistant</h1>
            <p className="text-xs text-slate-400">Scientific Discovery & Experiment Design</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
           <span>Model: Gemini 2.5 Flash</span>
           <span>v1.0</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 max-w-[1600px] w-full mx-auto">
        
        {/* Left Panel: Input */}
        <div className="w-full md:w-1/3 lg:w-[400px] flex-shrink-0 flex flex-col min-h-0">
            <ResearchForm 
                input={input} 
                onChange={handleInputChange} 
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>

        {/* Right Panel: Output */}
        <div className="flex-1 min-h-0 min-w-0">
             {error ? (
                 <div className="h-full flex items-center justify-center">
                     <div className="bg-red-50 text-red-600 p-6 rounded-lg max-w-md text-center border border-red-100">
                         <p className="font-bold mb-2">Generation Failed</p>
                         <p className="text-sm">{error}</p>
                     </div>
                 </div>
             ) : (
                <ResearchReport data={output} />
             )}
        </div>

      </main>
    </div>
  );
};

export default App;
