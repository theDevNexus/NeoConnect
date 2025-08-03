import { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

export default function ImageCaptioner() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please upload an image');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imageParts = await Promise.all(
        [image].map(fileToGenerativePart)
      );
      
      const result = await model.generateContent({
        contents: [{ 
          role: "user",
          parts: [
            { text: "Generate a detailed caption for this image:" },
            ...imageParts
          ]
        }]
      });
      
      setCaption(result.response.text());

    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to generate caption');
    } finally {
      setIsLoading(false);
    }
  };

  
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCaption('');
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
          Image Captioner
        </h1>
        <p className="text-gray-400 mb-8">Upload an image to generate an accurate description.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {image ? (
              <div className="flex flex-col items-center">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="max-h-64 mb-4 rounded-lg"
                />
                <span className="text-sm text-gray-400">Click to change image</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-500 mb-3" />
                <p className="text-gray-400">Click to upload image</p>
                <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!image || isLoading}
            className="bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2 w-full"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="h-5 w-5" />
                Generate Caption
              </>
            )}
          </button>
        </form>

        {caption && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-emerald-400" />
              Image Caption
            </h2>
            <p className="text-gray-300 whitespace-pre-line">{caption}</p>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(caption);
                alert('Caption copied!');
              }}
              className="mt-4 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
            >
              Copy Caption
            </button>
          </div>
        )}
      </div>
    </div>
  );
}