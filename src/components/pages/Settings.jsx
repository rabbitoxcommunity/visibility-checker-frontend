export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6 text-slate-700">
      <h2 className="text-3xl font-semibold text-slate-900">Settings</h2>
      <p className="text-base leading-7 text-slate-600">
        Configure your Nalar GPT account preferences and api integrations below.
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 mt-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-slate-900">General Settings</h3>
          <div className="space-y-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Default Model</span>
              <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none">
                <option>Nalar GPT 4o (Default)</option>
                <option>Nalar GPT o1</option>
                <option>Nalar GPT 3.5 Turbo</option>
              </select>
            </label>
            <label className="flex items-center gap-2 mt-2.5">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              <span className="text-sm text-slate-700 font-medium">Enable markdown formatting in results</span>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-slate-900">Profile Settings</h3>
          <div className="space-y-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">User Initials</span>
              <input type="text" defaultValue="AF" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</span>
              <input type="text" defaultValue="Faris" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
