import React from 'react'


// Affiche les colonnes du tableau des transactions avec sélection globale

const TableHeader = () => {
  return (
    <thead className='bg-gray-50 border-b'>
      <tr>
        <th className='px-4 md:px-6 py-3 text-left'>
          <input type="checkbox" className='w-4 h-4' />
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
          Invoice ID
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell'>
          Recipient Name
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell'>
          Date
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell'>
          Ville
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
          Amount (XOF)
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell'>
          Status
        </th>
        <th className='px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;