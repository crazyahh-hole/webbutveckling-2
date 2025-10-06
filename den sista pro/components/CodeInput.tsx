
import React from 'react';
import { PROGRAMMING_LANGUAGES } from '../constants';
import type { Language } from '../types';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-gray-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-40 p-2"
          aria-label="Select programming language"
        >
          {PROGRAMMING_LANGUAGES.map((lang: Language) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-1">
         <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste your ${language} code here...`}
          className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm p-4 rounded-b-md resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          style={{ minHeight: '500px' }}
          spellCheck="false"
        />
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Reviewing...' : '✨ Review Code'}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
