import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function SlideInDemo({ isOpen, onClose }) {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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
        contents: [{ parts: [{ text: `Summarize this in 3 concise sentences:\n\n${text}` }] }]
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
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[90%] md:w-[450px] bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 text-white">
          <h2 className="text-base sm:text-lg font-semibold">Demo: Summarizer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 text-white h-[calc(100%-64px)] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full p-3 text-sm rounded bg-gray-800 border border-gray-700 focus:outline-none"
              rows={6}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition text-white"
            >
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </form>

          {summary && (
            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded">
              <h3 className="text-sm font-semibold mb-2 text-cyan-400">Summary:</h3>
              <p className="text-gray-300 whitespace-pre-line text-sm">{summary}</p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(summary);
                  alert('Summary copied!');
                }}
                className="mt-3 bg-gray-700 hover:bg-gray-600 px-3 py-1 text-xs rounded"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
