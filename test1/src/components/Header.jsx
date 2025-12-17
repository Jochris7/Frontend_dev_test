import React from 'react'


//Composant header pour l'entete en bleu
//Affiche le titre de l'application et les informations de l'utilisateur connecté


function Header() {
  return (
    <div className='bg-[#1e5ebc] px-4 md:px-8 py-6 md:py-8 rounded-t-lg'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div className='flex items-center gap-3'>
          <img
            src="../assets/photo.jpg"
            alt="Profile"
            className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md'
          />
          <h1 className='text-2xl md:text-4xl font-bold text-gray-800'>
            Johan Ledjo
          </h1>
        </div>
        <h2 className='text-xl md:text-2xl font-semibold text-gray-700'>
          Historique des transactions
        </h2>
      </div>
    </div>
  )
}

export default Header