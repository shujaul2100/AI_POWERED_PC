import React, { useState, useEffect } from 'react';
import { Send, Loader2, Command, Sparkles } from 'lucide-react';

const App = () => {
  const [command, setCommand] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState('Innovation');
  const [showDropdown, setShowDropdown] = useState(false);

  const words = ['Innovation', 'Creativity', 'AI Excellence', 'Empowerment'];

  const examples = [
    "Generate a creative story about space exploration",
    "Explain quantum computing in simple terms",
    "Create a business strategy for a startup",
    "Design a workout plan for beginners"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prevWord => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/process-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      if (res.ok) {
        setResponses(prev => [...prev, 
          { type: 'user', content: command },
          ...(data.messages || [{type: 'assistant', content: 'Command executed successfully.'}])
        ]);
        setCommand('');
      } else {
        throw new Error(data.message || 'Failed to execute command.');
      }
    } catch (error) {
      setResponses(prev => [...prev, 
        { type: 'user', content: command },
        { type: 'error', content: `Error: Unable to process the command. ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setCommand(example);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 flex flex-col">
      {/* Header */}
      <header className="w-full fixed top-0 bg-gradient-to-r from-purple-950 to-purple-800 shadow-lg z-50 border-b border-purple-500/20">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <img src="/paal-logo.png" alt="Paal AI Logo" className="h-12 w-auto" />
            <h1 className="text-3xl font-bold text-white tracking-wide">PAAL AI</h1>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="text-cyan-300 text-xl font-light animate-pulse">
              {currentWord}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container with Fixed Height */}
      <div className="flex flex-col h-screen pt-24 pb-20">
        {/* Welcome Message */}
        {responses.length === 0 && (
          <div className="text-center mb-8 space-y-4 px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to PAAL AI</h2>
            <p className="text-lg text-white/80">Your intelligent assistant for anything and everything</p>
          </div>
        )}

        {/* Chat Container with Auto Height */}
        <div className="flex-grow overflow-hidden px-4 flex justify-center">
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 flex flex-col">
            {/* Messages Area with Scroll */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {responses.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-4 ${
                    msg.type === 'user' 
                      ? 'bg-cyan-500/20 text-white ml-4' 
                      : msg.type === 'error'
                      ? 'bg-red-500/20 text-red-200 border-l-4 border-red-500'
                      : 'bg-white/5 text-white border-l-4 border-cyan-400'
                  }`}>
                    <p className="text-sm md:text-base">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area - Fixed at Bottom */}
            <div className="border-t border-white/10 p-4">
              <div className="relative">
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <div className="relative flex-grow">
                    <textarea
                      className="w-full p-4 rounded-lg bg-white/5 border border-cyan-400/50 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 resize-none pr-12"
                      placeholder="Enter your command... (Press Enter to send)"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      rows="3"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="absolute right-3 top-3 p-2 text-white/50 hover:text-white transition-colors"
                    >
                      <Command className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 bg-cyan-400 hover:bg-cyan-300 text-purple-900 font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !command.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span className="hidden md:inline">Send</span>
                  </button>
                </form>

                {/* Examples Dropdown */}
                {showDropdown && (
                  <div className="absolute bottom-full mb-2 w-full bg-purple-900/95 rounded-lg shadow-xl border border-purple-500/20 backdrop-blur-sm">
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Command className="w-4 h-4" /> Example Commands
                      </h3>
                      <div className="space-y-2">
                        {examples.map((example, index) => (
                          <button
                            key={index}
                            onClick={() => handleExampleClick(example)}
                            className="w-full text-left p-2 text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors text-sm"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-4 text-center text-white/60 text-sm bg-purple-950/50 backdrop-blur-sm border-t border-purple-500/20">
        Powered by <span className="text-cyan-400 font-semibold">PAAL AI</span>
      </footer>
    </div>
  );
};

export default App;