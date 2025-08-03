import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function ResumePolisher() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [polished, setPolished] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some resume content.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: `Rewrite the following resume content to sound more ${tone.toLowerCase()} and impactful:\n\n${text}`
          }]
        }]
      });

      setPolished(result.response.text());

    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to polish the resume content.');
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
          Resume Polisher
        </h1>
        <p className="text-gray-400 mb-8">
          Paste your resume points or summary. Get a polished version with improved tone and clarity.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your resume content here..."
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows={8}
            required
          />

          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-gray-300 text-sm">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm focus:outline-none"
            >
              <option value="Professional">Professional</option>
              <option value="Confident">Confident</option>
              <option value="Concise">Concise</option>
              <option value="Impactful">Impactful</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition cursor-pointer "
          >
            {isLoading ? 'Polishing...' : 'Polish Resume'}
          </button>
        </form>

        {polished && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Polished Output</h2>
            <p className="text-gray-300 whitespace-pre-line">{polished}</p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(polished);
                alert('Polished resume copied!');
              }}
              className="mt-4 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition cursor-pointer"
            >
              Copy Output
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
