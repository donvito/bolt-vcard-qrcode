import React from 'react';
import { QrCode } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="flex items-center justify-center mb-8">
    <QrCode className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">VCard QR Generator</h1>
  </div>
);