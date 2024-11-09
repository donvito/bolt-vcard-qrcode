import React from 'react';

interface ActionButtonsProps {
  onLoadSample: () => void;
  onReset: () => void;
  onToggleRawEditor: () => void;
  showRawEditor: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onLoadSample,
  onReset,
  onToggleRawEditor,
  showRawEditor,
}) => (
  <div className="flex justify-center space-x-4 mb-8">
    <button
      onClick={onLoadSample}
      className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
    >
      Load Sample Data
    </button>
    <button
      onClick={onReset}
      className="px-4 py-2 bg-gray-600 dark:bg-gray-500 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
    >
      Reset Form
    </button>
    <button
      onClick={onToggleRawEditor}
      className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
    >
      {showRawEditor ? 'Hide Raw Editor' : 'Show Raw Editor'}
    </button>
  </div>
);