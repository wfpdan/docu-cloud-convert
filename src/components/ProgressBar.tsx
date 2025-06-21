
import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: string;
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full space-y-3 animate-fade-in">
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={status}
        />
      </div>
      
      <p className="text-body text-gray-600 text-center font-medium">
        {status}
      </p>
    </div>
  );
};

export default ProgressBar;
