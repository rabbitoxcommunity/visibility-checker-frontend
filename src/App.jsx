import { useState } from "react";
import CheckForm from "./components/CheckForm";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nazar-blue mb-4 shadow-lg">
          <svg width="36" height="22" viewBox="0 0 100 60" fill="none">
            <path d="M5 30 Q50 -10 95 30 Q50 70 5 30Z" fill="#e0f7fa" stroke="#00acc1" strokeWidth="4" />
            <circle cx="50" cy="30" r="14" fill="#00acc1" />
            <circle cx="50" cy="30" r="6" fill="#1a237e" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-nazar-blue tracking-tight">
          نَظَر &nbsp;·&nbsp; Nazar
        </h1>
        <p className="mt-2 text-gray-500 text-lg">Is your business seen by AI?</p>
        <p className="mt-1 text-gray-400 text-sm max-w-sm mx-auto">
          Find out if ChatGPT, Gemini, or Perplexity recommend your shop —
          and get an actionable fix checklist.
        </p>
      </div>

      <CheckForm onResult={setResult} loading={loading} setLoading={setLoading} />
      {result && <ResultCard result={result} />}

      <p className="mt-16 text-center text-xs text-gray-300">
        Nazar · AI visibility for local businesses · India & Gulf nazr
      </p>
    </div>
  );
}
