import React from 'react'
import { ChevronDown } from 'lucide-react';

// Fournit les boutons d'actions globales sur les transactions

// (onDownload) Télécharger les transactions (à implémenter)
// (onSortChange) Trier les transactions (à implémenter)

const ActionsBar = ({ onDownload, onSortChange }) => {
    return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 md:px-8 py-4 bg-white border-b'>
      <h2 className='text-xl font-semibold text-gray-700'>Transaction History</h2>
      <div className='flex gap-3 w-full sm:w-auto'>
        <button
          onClick={onDownload}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-initial justify-center'
        >
          Telecharger
          <ChevronDown size={18} />
        </button>
        <button
          onClick={onSortChange}
          className='flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-initial justify-center'
        >
          Ranger
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
};

export default ActionsBar;