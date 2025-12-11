export type TaskType = "literature_review" | "hypothesis_generation" | "experiment_design" | "data_analysis" | "model_development" | "paper_draft" | "grant_proposal" | "summary";

export interface ResearchInput {
  task_type: string;
  domain: string;
  context: string;
  constraints: string;
  deliverable_format: string;
  citation_style: string;
}

export interface Reference {
  title: string;
  authors: string;
  year: string;
  one_line_summary: string;
  citation: string;
}

export interface Section {
  heading: string;
  content: string;
}

export interface CodeSnippet {
  language: string;
  description: string;
  code: string;
}

export interface ResearchOutput {
  title: string;
  summary: string;
  sections: Section[];
  references?: Reference[];
  code_snippets?: CodeSnippet[];
  notes?: string;
}
