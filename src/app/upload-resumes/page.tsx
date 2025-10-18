'use client';

import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function UploadResumesPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    size: string;
    status: 'success' | 'error' | 'processing';
  }>>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      status: 'processing' as const
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate processing
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => 
        file.status === 'processing' ? { ...file, status: 'success' } : file
      ));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Resumes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload candidate resumes for AI-powered analysis and scoring
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <form
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className="space-y-6"
          >
            {/* Drag and Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="hidden"
              />
              
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              
              <div className="space-y-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Click to upload
                </label>
                <span className="text-gray-600"> or drag and drop</span>
                <p className="text-sm text-gray-500">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
            </div>

            {/* Upload Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-blue-600">Accepted Formats</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">PDF, DOC</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-green-600">Max File Size</p>
                <p className="text-2xl font-bold text-green-700 mt-1">10 MB</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-purple-600">Batch Upload</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">Unlimited</p>
              </div>
            </div>
          </form>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Uploaded Files ({uploadedFiles.length})
              </h2>
              <button
                onClick={() => setUploadedFiles([])}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {file.status === 'success' && (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Success</span>
                      </>
                    )}
                    {file.status === 'error' && (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-red-600">Failed</span>
                      </>
                    )}
                    {file.status === 'processing' && (
                      <>
                        <AlertCircle className="h-5 w-5 text-yellow-500 animate-pulse" />
                        <span className="text-sm font-medium text-yellow-600">Processing</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
