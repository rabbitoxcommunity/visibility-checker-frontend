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

export default function CheckForm({ onResult, loading, setLoading }) {
  const [form, setForm] = useState({
    businessName: "",
    location: "",
    category: CATEGORIES[0],
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          Business name
        </label>
        <input
          name="businessName"
          value={form.businessName}
          onChange={handleChange}
          required
          placeholder="e.g. Japan Square"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nazar-eye"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          Location / city
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          placeholder="e.g. Calicut"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nazar-eye"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nazar-eye bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-nazar-blue text-white font-semibold rounded-lg py-3 hover:bg-blue-900 transition disabled:opacity-50"
      >
        {loading ? "Checking…" : "Check AI visibility"}
      </button>
    </form>
  );
}
