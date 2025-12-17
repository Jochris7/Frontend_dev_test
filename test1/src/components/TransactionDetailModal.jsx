import React from 'react';
import StatusBadge from './StatusBadge';

//Affiche toutes les informations détaillées d'une transaction dans une fenêtre modale

{/*
  
Cliquer sur le fond → Ferme le modal
onClick={onClose}

Cliquer sur le contenu → Ne ferme PAS le modal
onClick={(e) => e.stopPropagation()}

*/}

const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
      onClick={onClose}
    >
      <div className='bg-white rounded-lg max-w-md w-full p-6 shadow-2xl' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Détails des transactions</h2>
        <div className='space-y-3'>
          <div className='flex justify-between py-2 border-b'>
            <span className='text-gray-600'>Numéro de facture :</span>
            <span className='font-semibold'>{transaction.id}</span>
          </div>
          <div className='flex justify-between py-2 border-b'>
            <span className='text-gray-600'>Nom du destinataire :</span>
            <span className='font-semibold'>{transaction.recipient}</span>
          </div>
          <div className='flex justify-between py-2 border-b'>
            <span className='text-gray-600'>Date:</span>
            <span className='font-semibold'>{transaction.date}</span>
          </div>
          <div className='flex justify-between py-2 border-b'>
            <span className='text-gray-600'>Ville :</span>
            <span className='font-semibold'>{transaction.ville}</span>
          </div>
          <div className='flex justify-between py-2 border-b'>
            <span className='text-gray-600'>Montant(XOF) :</span>
            <span className='font-semibold text-lg text-blue-600'>{transaction.amount}</span>
          </div>
          <div className='flex justify-between items-center py-2'>
            <span className='text-gray-600'>Statut:</span>
            <StatusBadge status={transaction.status} />
          </div>
        </div>
        <button
          onClick={onClose}
          className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium'
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;