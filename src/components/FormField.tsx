import React from 'react';

interface FormFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ name, value, onChange, isTextArea }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
      {name.replace(/([A-Z])/g, ' $1').trim()}
    </label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
        rows={3}
      />
    ) : (
      <input
        type={name === 'email' ? 'email' : name === 'tel' ? 'tel' : 'text'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${name}`}
        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
      />
    )}
  </div>
);