import React from 'react';
import { FormField } from './FormField';
import { VCardData } from '../types/VCardData';

interface VCardFormProps {
  vcardData: VCardData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const VCardForm: React.FC<VCardFormProps> = ({ vcardData, onChange }) => {
  const fieldGroups = [
    ['name', 'org', 'title', 'tel', 'url', 'email', 'adr'],
    ['linkedin', 'twitter'],
    ['note']
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Contact Information</h2>
      <div className="space-y-6">
        {fieldGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            {groupIndex === 1 && (
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-6 mb-2">
                Social Profiles
              </h3>
            )}
            {group.map(field => (
              <FormField
                key={field}
                name={field}
                value={vcardData[field as keyof VCardData]}
                onChange={onChange}
                isTextArea={field === 'note'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};