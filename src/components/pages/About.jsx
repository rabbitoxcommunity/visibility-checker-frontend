export default function AboutPage() {
  return (
    <div className="space-y-6 p-6 text-slate-700">
      <h2 className="text-3xl font-semibold text-slate-900">About Nazar</h2>
      <p className="text-base leading-7 text-slate-600">
        Nazar helps local businesses understand whether AI tools like ChatGPT, Gemini, and
        Perplexity can discover them. We ask a few quick questions, then provide a clear
        visibility score and action items to improve discoverability.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Why it matters</h3>
          <p className="mt-3 text-slate-600">
            AI recommendations are becoming a new search channel for local shops. If your business
            doesn’t appear there, you may miss valuable customers.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Our promise</h3>
          <p className="mt-3 text-slate-600">
            We keep things simple: one prompt-style experience, fast insights, and practical
            improvement steps tailored to your business and category.
          </p>
        </div>
      </div>
    </div>
  );
}
