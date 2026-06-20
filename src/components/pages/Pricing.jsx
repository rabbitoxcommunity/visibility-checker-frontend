export default function PricingPage() {
  return (
    <div className="space-y-6 p-6 text-slate-700">
      <h2 className="text-3xl font-semibold text-slate-900">Pricing</h2>
      <p className="text-base leading-7 text-slate-600">
        Nazar is designed to help local businesses test their AI visibility quickly. Choose the plan
        that fits your needs.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Free",
            price: "$0",
            description: "Single check and basic visibility guidance.",
            features: ["1 business check", "AI visibility score", "Basic checklist"],
          },
          {
            title: "Growth",
            price: "$9/mo",
            description: "Ongoing visibility support for one business.",
            features: ["Unlimited checks", "Category recommendations", "Monthly update tips"],
          },
          {
            title: "Pro",
            price: "$29/mo",
            description: "Best for agencies and multi-location businesses.",
            features: ["Multi-location support", "Priority insights", "Custom action plan"],
          },
        ].map((plan) => (
          <div key={plan.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{plan.title}</h3>
            <p className="mt-4 text-4xl font-bold text-slate-950">{plan.price}</p>
            <p className="mt-3 text-slate-600">{plan.description}</p>
            <ul className="mt-6 space-y-2 text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-nazar-blue text-white text-xs font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
