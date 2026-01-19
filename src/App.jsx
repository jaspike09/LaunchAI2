import React, { useState, useEffect, useRef } from 'react';
import { 
  Lightbulb, 
  GraduationCap, 
  ClipboardCheck, 
  Target, 
  Calculator, 
  ShieldCheck, 
  Send,
  Lock,
  ChevronRight,
  TrendingUp,
  Clock,
  Briefcase
} from 'lucide-react';

// --- CONFIGURATION ---
const APP_NAME = "LaunchAI";
const SUBSCRIPTION_PRICE = "$24.75/wk";
const COURSE_PRICE = "$89.00";

const App = () => {
  const [activeGem, setActiveGem] = useState('idea');
  const [unlockedGems, setUnlockedGems] = useState(['idea']);
  const [messages, setMessages] = useState({
    idea: [{ role: 'system', text: "Welcome to the Idea Creator. I find your 'Gold Mine.' What skills do you have, and how much time can you work daily?" }],
    mentor: [{ role: 'system', text: "I am your Business Mentor. We don't move until you master the step. Did you finish your Idea Validation yet?" }],
    secretary: [{ role: 'system', text: "Agentic Secretary here. I handle the paperwork. Need me to draft an email or organize a schedule?" }],
    marketing: [{ role: 'system', text: "Marketing Director ready. Let's find some customers. Where do you want to promote today?" }],
    accounting: [{ role: 'system', text: "Accounting & Tax Gem active. Let's count the profit. How much did we make today?" }]
  });
  const [inputText, setInputText] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeGem]);

  const gems = [
    { id: 'idea', name: 'Idea Creator', icon: <Lightbulb size={20} />, color: 'bg-yellow-500', desc: 'Find your Gold Mine' },
    { id: 'mentor', name: 'Business Mentor', icon: <GraduationCap size={20} />, color: 'bg-blue-600', desc: 'Step-by-Step Logic' },
    { id: 'secretary', name: 'Agentic Sec', icon: <ClipboardCheck size={20} />, color: 'bg-purple-500', desc: 'The AI Doer' },
    { id: 'marketing', name: 'Customer Magnet', icon: <Target size={20} />, color: 'bg-red-500', desc: 'Sales & Outreach' },
    { id: 'accounting', name: 'Money Tracker', icon: <Calculator size={20} />, color: 'bg-green-600', desc: 'Profit & Taxes' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsgs = { ...messages };
    newMsgs[activeGem] = [...newMsgs[activeGem], { role: 'user', text: inputText }];
    
    // Simulate Mentor Logic: If they talk to Mentor, show a quiz after 2 messages
    if (activeGem === 'mentor' && newMsgs.mentor.length === 3) {
      setTimeout(() => {
        setShowQuiz(true);
      }, 1000);
    }

    setMessages(newMsgs);
    setInputText('');
    
    // Simulate simple AI response
    setTimeout(() => {
      const responses = {
        idea: "That's a great skill. Based on that, I suggest a Service-based business. Shall we validate this idea?",
        mentor: "Understood. Before we proceed to legal setup, I need to check your comprehension.",
        secretary: "I've started a draft for your business plan. Would you like me to add a calendar for Week 1?",
        marketing: "Let's create 3 Facebook posts for you. Give me 1 minute.",
        accounting: "Note taken. I've put 30% of that into your Virtual Tax Bucket."
      };
      
      const updatedWithAI = { ...newMsgs };
      updatedWithAI[activeGem] = [...updatedWithAI[activeGem], { role: 'system', text: responses[activeGem] }];
      setMessages(updatedWithAI);
    }, 1500);
  };

  const handleQuizAnswer = (correct) => {
    setShowQuiz(false);
    const newMsgs = { ...messages };
    if (correct) {
      newMsgs.mentor = [...newMsgs.mentor, { role: 'system', text: "Correct! Accountability check passed. You are ready for Phase 2: Legal Setup. I have unlocked the Secretary Gem for you." }];
      setUnlockedGems([...unlockedGems, 'mentor', 'secretary']);
    } else {
      newMsgs.mentor = [...newMsgs.mentor, { role: 'system', text: "Not quite. Let's review the profit margin lesson again. We stay here until you get it right." }];
    }
    setMessages(newMsgs);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* SIDEBAR */}
      <div className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
            <TrendingUp size={28} /> {APP_NAME}
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Board of Directors</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {gems.map((gem) => {
            const isLocked = !unlockedGems.includes(gem.id);
            return (
              <button
                key={gem.id}
                disabled={isLocked}
                onClick={() => setActiveGem(gem.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeGem === gem.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-700 text-slate-300'
                } ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
              >
                <div className={`p-2 rounded-lg ${gem.color} text-white`}>
                  {isLocked ? <Lock size={16} /> : gem.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{gem.name}</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-tighter">{gem.desc}</p>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 bg-slate-900 m-4 rounded-2xl border border-slate-700">
          <p className="text-xs text-blue-400 font-bold mb-2">PRO STATUS</p>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Clock size={14} /> <span>Day 3 of 28</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[15%]"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic text-center">Sprint ends in 25 days</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative">
        {/* HEADER */}
        <header className="h-16 border-b border-slate-700 flex items-center justify-between px-8 bg-slate-800/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${gems.find(g => g.id === activeGem).color}`}></div>
            <h2 className="font-bold text-lg">{gems.find(g => g.id === activeGem).name}</h2>
          </div>
          <div className="flex gap-4">
            <button className="text-sm bg-slate-700 px-4 py-1.5 rounded-full hover:bg-slate-600">Help</button>
            <button className="text-sm bg-blue-600 px-4 py-1.5 rounded-full font-bold hover:bg-blue-500">Upgrade to Scale</button>
          </div>
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages[activeGem].map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {showQuiz && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-indigo-900/50 border-2 border-indigo-500 p-6 rounded-2xl animate-pulse">
                  <h3 className="font-bold text-indigo-200 mb-4 flex items-center gap-2">
                    <ShieldCheck /> MENTOR ACCOUNTABILITY QUIZ
                  </h3>
                  <p className="mb-4">To move to Step 2, what is a 'Profit Margin'?</p>
                  <div className="space-y-2">
                    <button onClick={() => handleQuizAnswer(false)} className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition-colors border border-slate-700">A) The total money coming into the business.</button>
                    <button onClick={() => handleQuizAnswer(true)} className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition-colors border border-slate-700">B) The percentage of revenue kept after all costs are paid.</button>
                    <button onClick={() => handleQuizAnswer(false)} className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm transition-colors border border-slate-700">C) The amount of tax you owe to the government.</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-6 bg-slate-900 border-t border-slate-700">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask the ${gems.find(g => g.id === activeGem).name}...`}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-100 shadow-2xl"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-500 transition-all"
              >
                <Send size={20} />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-500 mt-3 uppercase tracking-widest">
              Secured by LaunchAI Encryption &bull; {SUBSCRIPTION_PRICE} Subscription Active
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - DASHBOARD */}
      <div className="w-80 bg-slate-800 border-l border-slate-700 p-6 hidden lg:block overflow-y-auto">
        <h3 className="font-bold mb-6 text-slate-400 uppercase text-xs tracking-widest">Business Health</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-500">$1,450.00</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Tax Reserve (30%)</p>
            <p className="text-lg font-bold text-yellow-500">$435.00</p>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Upcoming Tasks</h4>
            <div className="space-y-3">
              {[
                { task: 'Register Domain', time: 'Today', icon: <Briefcase size={12}/> },
                { task: 'Facebook Ad Copy', time: 'Tomorrow', icon: <Target size={12}/> },
                { task: 'Client Invoice #001', time: 'Fri', icon: <Calculator size={12}/> }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">{t.icon}</span>
                    <span className="text-xs font-medium">{t.task}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{t.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl">
          <h4 className="font-bold text-white text-sm mb-2">Need a Boost?</h4>
          <p className="text-xs text-blue-100 mb-4 opacity-80">Get a 1-on-1 VIP Strategy session for 1 week.</p>
          <button className="w-full py-2 bg-white text-blue-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;