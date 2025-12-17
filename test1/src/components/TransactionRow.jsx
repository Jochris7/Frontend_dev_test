import React, { useState } from 'react';
import { MoreVertical, Copy, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

// Affiche une transaction individuelle avec ses informations et actions possibles

// Cliquer sur la ligne → Ouvre le modal de détails - onClick={() => onClick(transaction)}

// Cocher la checkbox → Sélectionne la transaction - onChange={(e) => onSelect(transaction.id)}

// Cliquer sur ⋮ → Affiche le menu d'actions - onClick={() => setShowMenu(!showMenu)}

// Cliquer sur "Supprimer" → Confirme puis supprime - onClick={handleDelete}


const TransactionRow = ({ transaction, isSelected, onSelect, onClick, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la transaction ${transaction.id} ?`)) {
      onDelete(transaction.id);
    }
    setShowMenu(false);
  };

  return (
    <tr
      className='border-b hover:bg-gray-50 cursor-pointer transition-colors'
      onClick={() => onClick(transaction) } 
      
    >
      <td className='px-4 md:px-6 py-4'>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(transaction.id);
          }}
          className='w-4 h-4 cursor-pointer'
        />
      </td>
      <td className='px-4 md:px-6 py-4'>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-gray-700'>ID: {transaction.id}</span>
          <button className='text-gray-400 hover:text-gray-600'>
            <Copy size={16} />
          </button>
        </div>
      </td>
      <td className='px-4 md:px-6 py-4 text-gray-700 hidden md:table-cell'>{transaction.recipient}</td>
      <td className='px-4 md:px-6 py-4 text-gray-600 hidden lg:table-cell'>{transaction.date}</td>
      <td className='px-4 md:px-6 py-4 text-gray-600 hidden xl:table-cell'>{transaction.ville}</td>
      <td className='px-4 md:px-6 py-4 font-semibold text-gray-800'>{transaction.amount}</td>
      <td className='px-4 md:px-6 py-4 hidden sm:table-cell'>
        <StatusBadge status={transaction.status} />
      </td>
      <td className='px-4 md:px-6 py-4 relative'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className='text-gray-400 hover:text-gray-600'
        >
          <MoreVertical size={20} />
        </button>
        
        {showMenu && (
          <div className='absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10'>
            <button
              onClick={handleDelete}
              className='w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg'
            >
              <Trash2 size={16} />
              Supprimer
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;