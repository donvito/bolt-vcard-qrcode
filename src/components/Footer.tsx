import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
    <div className="flex items-center justify-center space-x-1">
      <span>Made with</span>
      <Heart className="w-4 h-4 text-red-500 fill-current" />
      <span>by</span>
      <a
        href="https://donvitocodes.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 inline-flex items-center"
      >
        Donvitocodes
        <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </div>
    <div className="mt-2 flex items-center justify-center space-x-4">
      <a
        href="https://github.com/donvito"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        GitHub
      </a>
      <a
        href="https://x.com/donvito"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        X (Twitter)
      </a>
    </div>
  </footer>
);