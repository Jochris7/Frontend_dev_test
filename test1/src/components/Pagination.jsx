import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

//Permet de naviguer entre les différentes pages de transactions

{/*
  currentPage: 1,           // Page actuellement affichée
  totalPages: 3,            // Nombre total de pages
  onPageChange: (page) => {}// Fonction pour changer de page
*/}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [1, 2, 3, '...', 8, 9, 10];
  
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center gap-4 px-4 md:px-8 py-4 bg-white border-t'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      
      <div className='flex gap-2'>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'cursor-default'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;