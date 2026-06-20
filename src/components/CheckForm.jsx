import { useState } from "react";

const CATEGORIES = [
  "mobile phone shop",
  "electronics shop",
  "plywood shop",
  "steel & aluminium trader",
  "hardware store",
  "furniture shop",
  "textile shop",
  "supermarket",
];

const STEPS = [
  {
    key: "businessName",
    question: "What’s the company name?",
    placeholder: "e.g. Japan Square",
    type: "text",
  },
  {
    key: "location",
    question: "Which city is the business in?",
    placeholder: "e.g. Calicut",
    type: "text",
  },
  {
    key: "category",
    question: "Which category best fits your business?",
    type: "select",
    options: CATEGORIES,
  },
];

export default function CheckForm({ onResult, loading, setLoading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    businessName: "",
    location: "",
    category: CATEGORIES[0],
  });

  const step = STEPS[currentStep];

  const handleChange = (value) =>
    setForm((f) => ({ ...f, [step.key]: value }));

  const handleNext = async (event) => {
    event.preventDefault();

    if (!form[step.key]?.toString().trim()) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((current) => current + 1);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      onResult(data);
    } catch (err) {
      onResult({ error: "Network error. Is the backend running?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 shadow-2xl shadow-slate-200/40 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Question {currentStep + 1} of {STEPS.length}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              {step.question}
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {currentStep + 1}/{STEPS.length}
          </div>
        </div>

        <form onSubmit={handleNext} className="space-y-5">
          {STEPS.slice(0, currentStep).length > 0 && (
            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              {STEPS.slice(0, currentStep).map((completedStep) => (
                <div key={completedStep.key} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">{completedStep.question}</p>
                  <p className="mt-2 text-base font-medium text-slate-900">
                    {form[completedStep.key]}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div>
            {step.type === "select" ? (
              <select
                value={form[step.key]}
                onChange={(event) => handleChange(event.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-base text-slate-900 outline-none transition focus:border-nazar-eye focus:ring-2 focus:ring-nazar-eye/20"
              >
                {step.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={form[step.key]}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={step.placeholder}
                className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-base text-slate-900 outline-none transition focus:border-nazar-eye focus:ring-2 focus:ring-nazar-eye/20"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-nazar-blue px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking…" : currentStep < STEPS.length - 1 ? "Continue" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
