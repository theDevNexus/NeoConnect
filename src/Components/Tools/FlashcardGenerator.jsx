import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function FlashcardGenerator() {
  const [input, setInput] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter some content to generate flashcards.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: `Generate flashcards in question-answer pairs from this content:\n\n${input}\n\nFormat:\nQ: ...\nA: ...`
          }]
        }]
      });

      const raw = result.response.text();
      const parsedCards = raw
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .reduce((acc, line, idx, arr) => {
          if (line.startsWith('Q:') && arr[idx + 1]?.startsWith('A:')) {
            acc.push({
              question: line.replace(/^Q:\s*/, ''),
              answer: arr[idx + 1].replace(/^A:\s*/, '')
            });
          }
          return acc;
        }, []);

      setCards(parsedCards);

    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to generate flashcards.');
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
          Flashcard Generator
        </h1>
        <p className="text-gray-400 mb-8">
          Paste your study notes or content and get flashcards in question-answer format.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your notes here..."
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            rows={8}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
          >
            {isLoading ? 'Generating Flashcards...' : 'Generate Flashcards'}
          </button>
        </form>

        {cards.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Generated Flashcards</h2>
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg"
              >
                <p className="text-cyan-400 font-semibold mb-2">Q: {card.question}</p>
                <p className="text-gray-300">A: {card.answer}</p>
              </div>
            ))}

            <button
              onClick={() => {
                const allText = cards.map(c => `Q: ${c.question}\nA: ${c.answer}`).join('\n\n');
                navigator.clipboard.writeText(allText);
                alert('All flashcards copied!');
              }}
              className="mt-4 text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
            >
              Copy All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
