import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ResearchInput, ResearchOutput } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `You are the 'AI Research Assistant' — an expert, research-oriented AI whose job is to accelerate scientific discovery and research workflows. You must: (1) act like a senior research partner with clear, structured, citation-ready outputs; (2) avoid clinical or medical diagnosis and patient-specific medical advice; (3) prefer reproducibility, provide step-by-step experiment designs, statistical approaches, data preprocessing pipelines, and code snippets where relevant; (4) when referencing literature, return structured summaries (title, authors, year, one-line summary, key methods, key results, limitations) and, when requested, provide suggested citations in standard formats (APA); (5) when asked to generate hypotheses or experiment plans, include objectives, null/alternative hypotheses (if applicable), variables, controls, methodology, evaluation metrics, expected outcomes, and potential pitfalls; (6) when asked to analyze data or results, describe statistical tests, assumptions, required sample sizes (power analysis), and visualization suggestions; (7) always ask clarifying questions only when a request lacks minimal necessary context (dataset size, domain, constraints) — otherwise produce a best-effort output; (8) be concise but thorough and provide outputs in the requested format (JSON, markdown, paper, slide text, or code).`;

const OUTPUT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING },
          content: { type: Type.STRING },
        },
        required: ["heading", "content"],
      },
    },
    references: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            authors: { type: Type.STRING },
            year: { type: Type.STRING },
            one_line_summary: { type: Type.STRING },
            citation: { type: Type.STRING },
        },
         required: ["title", "authors", "year", "one_line_summary"],
      },
    },
    code_snippets: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                language: { type: Type.STRING },
                description: { type: Type.STRING },
                code: { type: Type.STRING },
            },
            required: ["language", "code"]
        }
    },
    notes: { type: Type.STRING }
  },
  required: ["title", "summary", "sections"]
};

export const generateResearch = async (input: ResearchInput): Promise<ResearchOutput> => {
  try {
    // Using the "Detailed Prompt" template from the spec
    const userPrompt = `You are the AI Research Assistant (system instructions applied). User request: Perform a '${input.task_type}' in the domain '${input.domain}'. Context: ${input.context}. Constraints: ${input.constraints}. Deliverable format: ${input.deliverable_format}. Provide: (1) a concise title; (2) a one-paragraph summary; (3) detailed sections covering background, methods, step-by-step plan, evaluation metrics, expected results, and potential pitfalls; (4) at least 3 structured literature references (title, authors, year, one-line summary, and formatted citation) if the task requires; (5) code snippets or pseudo-code when applicable. Use '${input.citation_style}' citation style. If dataset-related, include required sample size estimate (power analysis) and preprocessing steps. If parameters are missing, make reasonable assumptions and state them explicitly in 'notes'.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: OUTPUT_SCHEMA,
        temperature: 0.2, // Research focused
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated.");
    
    return JSON.parse(text) as ResearchOutput;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
