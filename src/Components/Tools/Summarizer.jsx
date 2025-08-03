import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft } from 'lucide-react';


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{ 
          parts: [{ 
            text: `Summarize this in 3 concise sentences:\n\n${text}` 
          }] 
        }]
      });
      
      setSummary(result.response.text());

    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
       
        <a 
          href="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-6"
        >
          <ArrowLeft size={18} /> Back to Tools
        </a>

        
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          Text Summarizer
        </h1>
        <p className="text-gray-400 mb-8">Paste your text below to generate a concise summary.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article here..."
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows={10}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className=" cursor-pointer bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Summarizing...
              </>
            ) : 'Summarize'}
          </button>
        </form>

        
        {summary && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-gray-300 whitespace-pre-line">{summary}</p>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(summary);
                alert('Summary copied!');
              }}
              className="mt-4 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition cursor-pointer"
            >
              Copy Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}