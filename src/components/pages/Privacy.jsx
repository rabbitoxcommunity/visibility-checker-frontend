export default function PrivacyPage() {
  return (
    <div className="space-y-6 p-6 text-slate-700">
      <h2 className="text-3xl font-semibold text-slate-900">Privacy Policy</h2>
      <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 shadow-sm">
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Information We Collect</h3>
          <p className="mt-2 leading-7">
            We collect the business name, city, and category you enter to provide visibility insights.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-slate-900">How We Use Data</h3>
          <p className="mt-2 leading-7">
            Your information is used only to generate the report and improve the service.
            We do not sell your data.
          </p>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Security</h3>
          <p className="mt-2 leading-7">
            We take basic precautions to protect the information entered into Nazar, but no system
            is completely secure.
          </p>
        </section>
      </div>
    </div>
  );
}
