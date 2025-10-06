import React from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
  onTranslate: () => void;
  isTranslating: boolean;
  isTranslated: boolean;
  canTranslate: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ 
  feedback, 
  isLoading, 
  error, 
  onTranslate, 
  isTranslating,
  isTranslated,
  canTranslate,
}) => {
  const renderContent = () => {
    if (isLoading && !feedback) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <SpinnerIcon className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium">Gemini is reviewing your code...</p>
          <p className="text-sm">This may take a moment.</p>
        </div>
      );
    }

    if (error && !feedback) {
      return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md w-full text-center">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
        </div>
      );
    }

    if (!feedback) {
      return (
        <div className="flex items-center justify-center h-full text-center text-gray-500">
          <p>Your code review will appear here.</p>
        </div>
      );
    }
    
    // Using a div with whitespace-pre-wrap to render Markdown-like text from Gemini.
    // This preserves formatting like newlines and spaces, and makes code blocks readable.
    return (
        <div 
          className="prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-300 whitespace-pre-wrap font-sans"
          // FIX: Cast the style object to React.CSSProperties to allow for CSS custom properties (variables) without TypeScript errors.
          style={{ 
             // custom styles to mimic prose
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-lead': '#e5e7eb',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#6b7280',
            '--tw-prose-hr': '#4b5563',
            '--tw-prose-quotes': '#f3f4f6',
            '--tw-prose-quote-borders': '#4b5563',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#f9fafb',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': 'rgba(0,0,0,0.3)',
            '--tw-prose-th-borders': '#4b5563',
            '--tw-prose-td-borders': '#374151',
           } as React.CSSProperties}
           dir={isTranslated ? "rtl" : "ltr"}
        >
          {feedback}
        </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-200">AI Feedback</h2>
        {canTranslate && (
           <button
              onClick={onTranslate}
              disabled={isTranslating}
              className="px-3 py-1 text-xs font-medium text-sky-300 bg-sky-900/50 border border-sky-700 rounded-md hover:bg-sky-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
              {isTranslating ? 'Translating...' : isTranslated ? 'Show Original' : 'Translate to Arabic'}
           </button>
        )}
      </div>
      <div className="flex-grow p-4 overflow-y-auto" style={{ minHeight: '500px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default FeedbackDisplay;