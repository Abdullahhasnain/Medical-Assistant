import React from 'react';
import { ResearchInput } from '../types';
import { TASK_TYPES, CITATION_STYLES, DELIVERABLE_FORMATS } from '../constants';
import { Sparkles, Loader2 } from 'lucide-react';

interface ResearchFormProps {
  input: ResearchInput;
  onChange: (field: keyof ResearchInput, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ input, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          New Research Task
        </h2>
        <p className="text-sm text-slate-500">Configure your research parameters below.</p>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Task Type</label>
          <select
            value={input.task_type}
            onChange={(e) => onChange('task_type', e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            {TASK_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Scientific Domain</label>
          <input
            type="text"
            value={input.domain}
            onChange={(e) => onChange('domain', e.target.value)}
            placeholder="e.g. NLP, Materials Science, Astrophysics"
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Context</label>
          <textarea
            value={input.context}
            onChange={(e) => onChange('context', e.target.value)}
            placeholder="Describe background, dataset size, prior results..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Constraints</label>
          <textarea
            value={input.constraints}
            onChange={(e) => onChange('constraints', e.target.value)}
            placeholder="Budget, timeline, compute limits, sample size..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm h-20 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Format</label>
            <select
              value={input.deliverable_format}
              onChange={(e) => onChange('deliverable_format', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {DELIVERABLE_FORMATS.map(f => (
                <option key={f} value={f}>{f.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Citation Style</label>
            <select
              value={input.citation_style}
              onChange={(e) => onChange('citation_style', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {CITATION_STYLES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={onSubmit}
          disabled={isLoading || !input.domain || !input.context}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Researching...
            </>
          ) : (
            "Generate Research Plan"
          )}
        </button>
      </div>
    </div>
  );
};
