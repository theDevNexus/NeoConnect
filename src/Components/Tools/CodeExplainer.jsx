import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft, Code, Copy } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function CodeExplainer() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter some code');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: `Explain this code in simple terms:\n\n${code}\n\nBreak down what it does step by step.`
          }]
        }]
      });
      
      setExplanation(result.response.text());

    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to generate explanation');
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
          Code Explainer
        </h1>
        <p className="text-gray-400 mb-8">Paste your code to get a detailed explanation.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full p-4 font-mono text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows={12}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <Code className="h-5 w-5" />
                Explain Code
              </>
            )}
          </button>
        </form>

       
        {explanation && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-emerald-400" />
              Code Explanation
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-line">{explanation}</p>
            </div>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(explanation);
                alert('Explanation copied!');
              }}
              className="mt-4 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <Copy className="h-4 w-4" />
              Copy Explanation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}