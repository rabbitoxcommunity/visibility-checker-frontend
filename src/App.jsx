import { useState, useEffect, useRef } from "react";
import ResultCard from "./components/ResultCard";

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

export default function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0: welcome, 1: name, 2: location, 3: category, 4: loading, 5: results
  const [form, setForm] = useState({
    businessName: "",
    location: "",
    category: "",
  });
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleReset = () => {
    setCurrentStep(0);
    setForm({ businessName: "", location: "", category: "" });
    setMessages([]);
    setInputValue("");
    setResult(null);
    setLoading(false);
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text && currentStep !== 3) return;

    setInputValue("");

    if (currentStep === 0) {
      // Transition from welcome state to gathering location
      const newMessages = [
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: "Got it! Which city is the business in?" }
      ];
      setMessages(newMessages);
      setForm(f => ({ ...f, businessName: text }));
      setCurrentStep(2);
    } else if (currentStep === 1) {
      // Gathering business name
      const newMessages = [
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: "Got it! Which city is the business in?" }
      ];
      setMessages(newMessages);
      setForm(f => ({ ...f, businessName: text }));
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Gathering location
      const newMessages = [
        ...messages,
        { role: "user", content: text },
        { role: "assistant", content: "Thanks! Which category best fits your business? Select one below:" }
      ];
      setMessages(newMessages);
      setForm(f => ({ ...f, location: text }));
      setCurrentStep(3);
    }
  };

  const handleCategorySelect = async (selectedCategory) => {
    const updatedForm = { ...form, category: selectedCategory };
    setForm(updatedForm);

    const newMessages = [
      ...messages,
      { role: "user", content: selectedCategory },
    ];
    setMessages(newMessages);
    setCurrentStep(4);
    setLoading(true);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedForm),
      });
      const data = await res.json();
      setResult(data);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Here are the visibility check results for **${updatedForm.businessName}** in **${updatedForm.location}** (${updatedForm.category}):`,
          result: data,
        },
      ]);
      setCurrentStep(5);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! I encountered a network error. Is the backend running at port 4000?",
          error: true,
        },
      ]);
      setCurrentStep(5);
    } finally {
      setLoading(false);
    }
  };

  const renderInputForm = (isCentered = false) => {
    return (
      <form onSubmit={handleSend} className={`w-full ${isCentered ? "max-w-xl mt-6 animate-fade-in" : "max-w-2xl"} border border-slate-200/80 rounded-[20px] bg-[#F8FAFC]/50 focus-within:bg-white focus-within:border-slate-300 focus-within:shadow-md transition-all px-4 py-3 flex flex-col gap-2 shadow-sm`}>
        {/* Textarea */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            currentStep === 0 || currentStep === 1
              ? "What’s the company name?"
              : currentStep === 2
              ? "Which city is the business in?"
              : currentStep === 3
              ? "Choose category from option list above..."
              : "✨ Write your thoughts here..."
          }
          disabled={currentStep === 3 || loading}
          className="w-full bg-transparent resize-none border-none outline-none text-[13.5px] text-slate-800 placeholder-slate-400 min-h-[44px] max-h-[160px] leading-relaxed"
        />

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between border-t border-slate-100/80 pt-2 shrink-0">
          {/* Left Pills */}
          <div className="flex items-center gap-2 select-none">
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors text-[10.5px] font-semibold text-slate-500 cursor-pointer">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add files
            </button>
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors text-[10.5px] font-semibold text-slate-500 cursor-pointer">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search
            </button>
            <button type="button" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors text-[10.5px] font-semibold text-slate-500 cursor-pointer">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              Reasoning
            </button>
          </div>

          {/* Right Button Panel */}
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer select-none" title="Voice Search">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
            <button
              type="submit"
              disabled={loading || currentStep === 3 || !inputValue.trim()}
              className="w-8 h-8 rounded-full bg-[#1a73e8] hover:bg-blue-600 active:scale-95 flex items-center justify-center shadow-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none"
              title="Send Message"
            >
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="w-full h-full bg-white flex overflow-hidden font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-[72px] border-r border-slate-100 flex flex-col justify-between py-6 items-center shrink-0 bg-slate-50/30">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Logo */}
          <div className="w-9 h-9 flex flex-wrap gap-[3px] p-[3px] justify-center items-center cursor-pointer" onClick={handleReset}>
            <div className="w-[13px] h-[13px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[1px] bg-[#1a73e8]" />
            <div className="w-[13px] h-[13px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[1px] rounded-br-[5px] bg-[#1a73e8]" />
            <div className="w-[13px] h-[13px] rounded-tl-[5px] rounded-tr-[1px] rounded-bl-[5px] rounded-br-[5px] bg-[#1a73e8]" />
            <div className="w-[13px] h-[13px] rounded-tl-[1px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[5px] bg-[#1a73e8]" />
          </div>

          {/* Icons Stack */}
          <div className="flex flex-col items-center gap-5 w-full mt-4">
            <a href="/" className="p-2 rounded-xl text-[#1a73e8] bg-blue-50/50 cursor-pointer transition-all" title="Home">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
            <a href="/about" className="p-2 rounded-xl text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50/30 transition-all cursor-pointer" title="About">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </a>
            <a href="/pricing" className="p-2 rounded-xl text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50/30 transition-all cursor-pointer" title="Pricing">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </a>
            <a href="/terms" className="p-2 rounded-xl text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50/30 transition-all cursor-pointer" title="Terms of Service">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </a>
            <a href="/privacy" className="p-2 rounded-xl text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50/30 transition-all cursor-pointer" title="Privacy Policy">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </a>
            <a href="/settings" className="p-2 rounded-xl text-slate-400 hover:text-[#1a73e8] hover:bg-blue-50/30 transition-all cursor-pointer" title="Settings">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* User Initials Avatar */}
        <a href="/settings" className="w-9 h-9 rounded-full bg-[#bfdbfe]/60 text-[#1e3a8a] text-[13px] font-semibold flex items-center justify-center cursor-pointer hover:bg-[#bfdbfe] transition-colors" title="User Profile">
          AF
        </a>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col justify-between h-full bg-white relative">
        {/* TOP HEADER */}
        <div className="h-14 border-b border-slate-100/80 px-6 flex items-center justify-between shrink-0">
          {/* Dropdown Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded-full text-[12px] font-semibold text-slate-700 cursor-pointer border border-slate-100">
            <span>Nalar GPT 4o</span>
            <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3.5">
            <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" title="Reset Chat" onClick={handleReset}>
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>
            <div className="h-4 w-[1px] bg-slate-200" />
            <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" title="Notifications">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" title="Settings">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* WORKSPACE MIDDLE BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {currentStep === 0 ? (
            /* INITIAL WELCOME SCREEN */
            <div className="h-full flex flex-col justify-center items-center">
              {/* CSS 3D Sphere */}
              <div className="relative flex flex-col items-center select-none animate-fade-in">
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-[#1d4ed8] via-[#7c3aed] to-[#06b6d4] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.4),_0_15px_30px_rgba(124,58,237,0.3)] z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/30 blur-[0.5px]"></div>
                  <div className="absolute top-[8%] left-[8%] w-[25%] h-[25%] bg-white/35 rounded-full blur-[2.2px]"></div>
                </div>
                <div className="w-24 h-4 bg-black/10 rounded-full blur-[6px] mt-6"></div>
              </div>

              {/* Text */}
              <p className="text-xs font-semibold text-slate-400/80 mt-6 tracking-wide select-none">
                Welcome back, Faris!
              </p>
              <h1 className="text-[38px] leading-[46px] font-semibold text-slate-900 text-center mt-3 max-w-lg tracking-tight select-none">
                What’s the company name?
              </h1>

              {/* Centered Input Form */}
              {renderInputForm(true)}

              <p className="text-[10px] text-slate-400 mt-3 select-none text-center animate-fade-in">
                Nalar GPT can make mistakes. Please verify again!
              </p>
            </div>
          ) : (
            /* ACTIVE CHAT STREAM */
            <div className="w-full max-w-2xl mx-auto space-y-6 flex flex-col justify-start">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {/* Avatar for Assistant */}
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full border border-slate-200/50 flex flex-wrap gap-[2px] p-[2px] justify-center items-center bg-[#f8fafc] shrink-0 mt-0.5 shadow-sm">
                      <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[1px] bg-[#1a73e8]" />
                      <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[1px] rounded-br-[4px] bg-[#1a73e8]" />
                      <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[1px] rounded-bl-[4px] rounded-br-[4px] bg-[#1a73e8]" />
                      <div className="w-[10px] h-[10px] rounded-tl-[1px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] bg-[#1a73e8]" />
                    </div>
                  )}

                  {/* Message body */}
                  <div className={`max-w-[85%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-2.5 rounded-[18px] text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-slate-100 text-slate-800 rounded-tr-[4px]"
                          : "bg-white border border-slate-100 text-slate-800 rounded-tl-[4px]"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Category Selector inside AI bubble */}
                    {msg.role === "assistant" && idx === messages.length - 1 && currentStep === 3 && (
                      <div className="flex flex-wrap gap-2 mt-2 max-w-full">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className="bg-blue-50/50 hover:bg-blue-100/80 border border-blue-100 text-blue-700 hover:text-blue-800 font-medium text-xs px-3.5 py-2 rounded-full cursor-pointer transition-all active:scale-95 shadow-sm capitalize"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Result Card rendering inside AI bubble */}
                    {msg.result && (
                      <div className="w-full mt-2 bg-slate-50/50 rounded-2xl p-2 border border-slate-100 shadow-sm">
                        <ResultCard result={msg.result} />
                      </div>
                    )}
                  </div>

                  {/* Avatar for User */}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#bfdbfe]/50 text-[#1e3a8a] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      AF
                    </div>
                  )}
                </div>
              ))}

              {/* Chat loader */}
              {loading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full border border-slate-200/50 flex flex-wrap gap-[2px] p-[2px] justify-center items-center bg-[#f8fafc] shrink-0 mt-0.5">
                    <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[1px] bg-[#1a73e8]" />
                    <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[1px] rounded-br-[4px] bg-[#1a73e8]" />
                    <div className="w-[10px] h-[10px] rounded-tl-[4px] rounded-tr-[1px] rounded-bl-[4px] rounded-br-[4px] bg-[#1a73e8]" />
                    <div className="w-[10px] h-[10px] rounded-tl-[1px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] bg-[#1a73e8]" />
                  </div>
                  <div className="bg-white border border-slate-100 text-slate-800 px-4 py-3 rounded-[18px] rounded-tl-[4px] text-sm flex items-center gap-1.5 shadow-sm">
                    <span className="flex gap-1 items-center justify-center">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce delay-300"></span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* BOTTOM INPUT CONTAINER */}
        {currentStep > 0 && (
          <div className="p-6 border-t border-slate-100/60 bg-white flex flex-col items-center shrink-0">
            {renderInputForm(false)}
            <p className="text-[10px] text-slate-400 mt-2.5 select-none text-center">
              Nalar GPT can make mistakes. Please verify again!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
