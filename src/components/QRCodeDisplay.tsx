import React from 'react';
import { Download, Clipboard, Check, Upload } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  onDownload: () => void;
  onCopy: () => void;
  onLogoChange: (file: File) => void;
  copied: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCodeUrl,
  onDownload,
  onCopy,
  onLogoChange,
  copied,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoChange(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Generated QR Code</h2>
      <div className="flex flex-col items-center justify-center space-y-6">
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-64 h-64 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white"
          />
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onDownload}
            className="flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR
          </button>
          <button
            onClick={onCopy}
            className="flex items-center px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Clipboard className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy VCard'}
          </button>
          <label className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Change Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};