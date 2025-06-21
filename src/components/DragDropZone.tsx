
import React, { useState } from 'react';
import { CloudUpload } from 'lucide-react';

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const DragDropZone: React.FC<DragDropZoneProps> = ({ onFileSelect, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileSelect(file);
      }
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type);
  };

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver && !disabled 
            ? 'border-primary bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
          min-h-[120px] flex flex-col items-center justify-center gap-4
          lg:min-h-[140px]
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload 
          size={24} 
          className={`${isDragOver && !disabled ? 'text-primary' : 'text-gray-400'} transition-colors`}
          aria-hidden="true"
        />
        
        <div className="space-y-2">
          <p className="text-body font-medium text-gray-700">
            Drop your file here or{' '}
            <label 
              htmlFor="file-input" 
              className={`text-primary underline ${disabled ? 'pointer-events-none' : 'cursor-pointer hover:text-blue-700'}`}
            >
              browse files
            </label>
          </p>
          
          <input
            id="file-input"
            type="file"
            className="sr-only"
            accept=".pdf,.docx,.doc,.xlsx"
            onChange={handleFileInput}
            disabled={disabled}
            aria-label="Upload file"
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-3 text-center">
        Supported formats: PDF, DOCX, DOC, XLSX
      </p>
    </div>
  );
};

export default DragDropZone;
