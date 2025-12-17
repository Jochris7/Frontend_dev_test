import React from 'react'

//Affiche visuellement le statut d'une transaction avec code couleur


const StatusBadge = ({ status }) => {
  const statusStyles = {
    Finis: 'bg-green-100 text-green-700',//Transaction terminée
    Annulé: 'bg-red-100 text-red-700',// Transaction annulée
    En_Cours: 'bg-gray-100 text-gray-700'//Transaction en attente
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;