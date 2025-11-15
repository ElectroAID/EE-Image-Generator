
import React, { useState, useCallback } from 'react';
import { generateImages } from './services/geminiService';
import type { AspectRatio } from './types';
import { CircuitIcon, ImageIcon, SparkleIcon } from './components/icons';

const ASPECT_RATIOS: { label: string; value: AspectRatio }[] = [
  { label: 'Square', value: '1:1' },
  { label: 'Portrait', value: '3:4' },
  { label: 'Landscape', value: '4:3' },
  { label: 'Mobile', value: '9:16' },
  { label: 'Widescreen', value: '16:9' },
];

const EXAMPLE_PROMPTS = [
  "A detailed schematic of a 555 timer astable multivibrator circuit, vintage style.",
  "Photorealistic image of a custom PCB with gold-plated traces and glowing LEDs.",
  "Conceptual art of an electron orbiting an atom nucleus, neon-cyberpunk style.",
  "A high-tech electrical engineering lab with oscilloscopes and function generators.",
];

const Header: React.FC = () => (
  <header className="flex items-center space-x-3 mb-6">
    <CircuitIcon className="h-10 w-10 text-cyan-400" />
    <div>
      <h1 className="text-2xl font-bold text-white">EE Image Generator</h1>
      <p className="text-sm text-gray-400">AI-Powered Visuals for Electrical Engineers</p>
    </div>
  </header>
);

const LoadingSkeleton: React.FC<{ aspectRatio: AspectRatio }> = ({ aspectRatio }) => {
  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case '1:1': return 'aspect-square';
      case '3:4': return 'aspect-[3/4]';
      case '4:3': return 'aspect-[4/3]';
      case '9:16': return 'aspect-[9/16]';
      case '16:9': return 'aspect-[16/9]';
      default: return 'aspect-square';
    }
  };
  return <div className={`w-full bg-gray-700/50 rounded-lg animate-pulse ${getAspectRatioClass(aspectRatio)}`}></div>;
};

const GalleryPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full w-full border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
        <ImageIcon className="h-20 w-20 text-gray-500 mb-4"/>
        <h3 className="text-xl font-semibold text-white">Your images will appear here</h3>
        <p className="text-gray-400 mt-2">Enter a prompt and let the AI create stunning visuals for you.</p>
    </div>
);

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generated = await generateImages(prompt, aspectRatio);
      setImages(generated);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);
  
  const handleExamplePrompt = (p: string) => {
      setPrompt(p);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-[450px] lg:min-w-[450px] bg-gray-800/50 p-6 lg:p-8 flex flex-col border-r border-gray-700/50">
        <Header />
        
        <div className="flex-grow flex flex-col space-y-6">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter your prompt
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A photorealistic image of a custom PCB..."
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    disabled={isLoading}
                />
            </div>
            
            <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Example Prompts</h3>
                <div className="grid grid-cols-2 gap-2">
                    {EXAMPLE_PROMPTS.map((p) => (
                         <button
                            key={p}
                            onClick={() => handleExamplePrompt(p)}
                            disabled={isLoading}
                            className="text-xs text-left text-gray-400 bg-gray-900 hover:bg-gray-700/80 p-2 rounded-md transition-colors disabled:opacity-50"
                        >
                            {p.substring(0, 40)}...
                        </button>
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="text-sm font-medium text-gray-300 mb-3">Aspect Ratio</h3>
                 <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                     {ASPECT_RATIOS.map(({ label, value }) => (
                         <button
                             key={value}
                             onClick={() => setAspectRatio(value)}
                             disabled={isLoading}
                             className={`px-3 py-2 text-xs rounded-md transition-colors disabled:opacity-50 ${
                                 aspectRatio === value
                                     ? 'bg-cyan-600 text-white font-semibold ring-2 ring-offset-2 ring-offset-gray-800 ring-cyan-500'
                                     : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                             }`}
                         >
                             {label}
                         </button>
                     ))}
                 </div>
            </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
             <>
                <SparkleIcon className="h-5 w-5 mr-2" />
                Generate Images
             </>
          )}
        </button>
      </aside>

      <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <LoadingSkeleton key={i} aspectRatio={aspectRatio} />
                    ))}
                </div>
            )}
            
            {error && (
                <div className="flex items-center justify-center h-full">
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {!isLoading && !error && images.length === 0 && (
                <GalleryPlaceholder />
            )}

            {!isLoading && images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="bg-gray-800 p-2 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/20">
                            <img 
                                src={src} 
                                alt={`Generated image ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
