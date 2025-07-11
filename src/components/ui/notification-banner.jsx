import React from 'react';
import { Button } from './button';
import { X, CheckCircle, ExternalLink } from 'lucide-react';

const NotificationBanner = ({ onClose, pluginName, projectName, projectUrl }) => {

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-medium text-lg mb-1">
                Plugin successfully installed!
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                {pluginName} has been installed to project '{projectName}'.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => window.open(projectUrl, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Project
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white ml-2 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NotificationBanner }; 