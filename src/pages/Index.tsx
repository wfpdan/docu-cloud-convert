
import React, { useState } from 'react';
import DragDropZone from '../components/DragDropZone';
import ProgressBar from '../components/ProgressBar';
import CompletionState from '../components/CompletionState';

type AppState = 'idle' | 'uploading' | 'processing' | 'completed';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('idle');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [googleDocsUrl, setGoogleDocsUrl] = useState('');

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name, file.type);
    
    // Start upload simulation
    setAppState('uploading');
    setStatus('Uploading...');
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 50) {
          clearInterval(uploadInterval);
          // Start processing phase
          setAppState('processing');
          setStatus('Processing...');
          
          const processInterval = setInterval(() => {
            setProgress(prevProgress => {
              if (prevProgress >= 100) {
                clearInterval(processInterval);
                // Complete the process
                setTimeout(() => {
                  setAppState('completed');
                  setGoogleDocsUrl('https://docs.google.com/document/d/example');
                }, 500);
                return 100;
              }
              return prevProgress + 5;
            });
          }, 100);
          
          return prev + 5;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleUploadAnother = () => {
    setAppState('idle');
    setProgress(0);
    setStatus('');
    setGoogleDocsUrl('');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-title font-semibold text-gray-900">
              Document Converter
            </h1>
            <p className="text-body text-gray-600">
              Upload a file – get a Google Docs link
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Drag and Drop Zone */}
            {(appState === 'idle') && (
              <DragDropZone 
                onFileSelect={handleFileSelect}
                disabled={appState !== 'idle'}
              />
            )}

            {/* Progress Bar */}
            <ProgressBar
              progress={progress}
              status={status}
              isVisible={appState === 'uploading' || appState === 'processing'}
            />

            {/* Completion State */}
            <CompletionState
              googleDocsUrl={googleDocsUrl}
              onUploadAnother={handleUploadAnother}
              isVisible={appState === 'completed'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
