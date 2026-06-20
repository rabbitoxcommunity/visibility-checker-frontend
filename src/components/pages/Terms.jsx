export default function TermsPage() {
  return (
    <div className="space-y-6 p-6 text-slate-700">
      <h2 className="text-3xl font-semibold text-slate-900">Terms of Service</h2>
      <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 shadow-sm">
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Acceptance of Terms</h3>
          <p className="mt-2 leading-7">
            By using Nazar, you agree to these terms and any updates we make. Use our service for
            lawful purposes only.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Service Description</h3>
          <p className="mt-2 leading-7">
            Nazar provides visibility insights for local businesses using AI-powered analysis. We do
            not guarantee specific search outcomes.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Limitations</h3>
          <p className="mt-2 leading-7">
            We are not responsible for third-party results or decisions made based on the information
            provided by our service.
          </p>
        </section>
      </div>
    </div>
  );
}
