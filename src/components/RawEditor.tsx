import React from 'react';

interface RawEditorProps {
  vcardString: string;
  onChange: (value: string) => void;
}

export const RawEditor: React.FC<RawEditorProps> = ({ vcardString, onChange }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Raw VCard Editor</h2>
    <textarea
      value={vcardString}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-64 font-mono text-sm px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
      spellCheck="false"
    />
  </div>
);