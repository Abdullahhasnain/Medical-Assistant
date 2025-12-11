import React from 'react';
import { ResearchOutput } from '../types';
import { BookOpen, Code, FileText, Info, Copy, Check } from 'lucide-react';

interface ResearchReportProps {
  data: ResearchOutput | null;
}

export const ResearchReport: React.FC<ResearchReportProps> = ({ data }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border border-dashed border-slate-300 rounded-xl bg-slate-50/50">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <FileText className="w-8 h-8 text-slate-300" />
        </div>
        <p className="font-medium text-slate-500">No research generated yet</p>
        <p className="text-sm mt-1">Fill out the form to start your discovery.</p>
      </div>
    );
  }

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-8 overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">{data.title}</h1>
          <div className="bg-indigo-50 text-indigo-900 p-4 rounded-lg text-sm leading-relaxed border border-indigo-100">
            <span className="font-semibold block mb-1 text-indigo-700">Abstract / Summary</span>
            {data.summary}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {data.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                <span className="w-6 h-6 rounded bg-slate-100 text-slate-500 text-xs flex items-center justify-center mr-2 font-mono">
                  {idx + 1}
                </span>
                {section.heading}
              </h3>
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-8">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Code Snippets */}
        {data.code_snippets && data.code_snippets.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-slate-500" />
              Technical Implementation
            </h3>
            <div className="space-y-6">
              {data.code_snippets.map((snippet, idx) => (
                <div key={idx} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                  <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400 lowercase">{snippet.language}</span>
                    <button 
                      onClick={() => handleCopyCode(snippet.code, `code-${idx}`)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCode === `code-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900">
                    <p className="text-slate-400 text-xs mb-2 italic border-l-2 border-indigo-500 pl-2">
                        {snippet.description}
                    </p>
                    <pre className="text-slate-300 text-sm overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-slate-500" />
              References & Literature
            </h3>
            <div className="grid gap-4">
              {data.references.map((ref, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-sm">{ref.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{ref.authors} ({ref.year})</p>
                  <p className="text-xs text-slate-600 mt-2 italic">"{ref.one_line_summary}"</p>
                  <div className="mt-3 pt-3 border-t border-slate-200/50">
                     <p className="text-[10px] text-slate-400 font-mono bg-white inline-block px-2 py-1 rounded border border-slate-100">
                        {ref.citation}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-sm font-bold text-amber-800">AI Assistant Notes</h4>
                    <p className="text-xs text-amber-700 mt-1">{data.notes}</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
