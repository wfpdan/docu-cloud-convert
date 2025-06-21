
import React from 'react';
import { Check } from 'lucide-react';

interface CompletionStateProps {
  googleDocsUrl: string;
  onUploadAnother: () => void;
  isVisible: boolean;
}

const CompletionState: React.FC<CompletionStateProps> = ({ googleDocsUrl, onUploadAnother, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full space-y-6 text-center animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={24} className="text-green-600" aria-hidden="true" />
        </div>
        
        <div className="space-y-2">
          <p className="text-body font-medium text-gray-700">
            Done! Your document is ready:
          </p>
          
          <a
            href={googleDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-blue-700 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5"
            aria-label="Open converted document in Google Docs"
          >
            Open in Google Docs
          </a>
        </div>
      </div>
      
      <button
        onClick={onUploadAnother}
        className="w-full bg-white border-2 border-primary text-primary font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px]"
        aria-label="Upload another file"
      >
        Upload another file
      </button>
    </div>
  );
};

export default CompletionState;
