import EyeIcon from "./EyeIcon";

export default function ResultCard({ result }) {
  if (result.error) {
    return (
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {result.error}
      </div>
    );
  }

  const { isVisible, competitorsMentioned, fixes, aiResponse, businessId } = result;

  return (
    <div className="mt-10 w-full max-w-xl mx-auto space-y-6">
      <div
        className={`rounded-2xl p-6 text-center shadow-md ${
          isVisible
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <EyeIcon visible={isVisible} />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {isVisible ? "Your business IS visible to AI" : "AI cannot see your business"}
        </h2>
        <p className="mt-1 text-gray-500 text-sm">
          {isVisible
            ? "Great! You showed up in the AI recommendation."
            : "You did not appear when AI was asked for the best options in your area."}
        </p>
      </div>

      {!isVisible && competitorsMentioned?.length > 0 && (
        <div className="rounded-xl p-5 bg-amber-50 border border-amber-200">
          <h3 className="font-semibold text-gray-700 mb-2">
            Instead, AI recommended these competitors:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            {competitorsMentioned.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {fixes?.length > 0 && (
        <div className="rounded-xl p-5 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-gray-700 mb-3">
            How to get found — fix checklist:
          </h3>
          <ul className="space-y-2">
            {fixes.map((fix, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-nazar-blue text-white flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {fix}
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="rounded-xl border border-gray-200 bg-gray-50">
        <summary className="px-4 py-3 cursor-pointer text-sm text-gray-500 font-medium">
          View raw AI response
        </summary>
        <pre className="px-4 pb-4 text-xs text-gray-600 whitespace-pre-wrap">
          {aiResponse}
        </pre>
      </details>

      <p className="text-center text-xs text-gray-400">Business ID: {businessId}</p>
    </div>
  );
}
