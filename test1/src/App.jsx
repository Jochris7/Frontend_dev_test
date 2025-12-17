import { useState } from 'react';
import Header from './components/Header';
import ActionsBar from './components/ActionBar';
import Pagination from './components/Pagination';
import TableHeader from './components/TableHeader';
import TransactionDetailModal from './components/TransactionDetailModal';
import TransactionRow from './components/TransactionRow';

//Composant parent qui engloble la quasi-totalité des composants pour les afficher et leur permettre de communiquer 

//Dataset fictifs pour afficher les differentes transactions de l'utilisateur
const allTransactions = [
  // Page 1
  { id: '80280', recipient: 'Mariam N\'Dri', date: '14 Mar, 2023', ville: 'Anyama', amount: '324 976', status: 'Pending' },
  { id: '75674', recipient: 'Diaby Bah', date: '15 Jun, 2020', ville: 'Korhogo', amount: '150 744', status: 'Pending' },
  { id: '49949', recipient: 'Coulibaly Yao', date: '10 Apr, 2021', ville: 'Abobo', amount: '265 614', status: 'Pending' },
  { id: '26210', recipient: 'Adjoua Aka', date: '28 Aug, 2020', ville: 'Agboville', amount: '460 593', status: 'Pending' },
  { id: '81066', recipient: 'Sanogo Yao', date: '22 Nov, 2025', ville: 'Treichville', amount: '166 661', status: 'Pending' },
  { id: '14306', recipient: 'Kouadio Cissé', date: '07 Aug, 2023', ville: 'Plateau', amount: '218 506', status: 'Cancelled' },
  { id: '50701', recipient: 'Aboubacar Konan', date: '28 Feb, 2022', ville: 'Korhogo', amount: '305 202', status: 'Pending' },
  { id: '54613', recipient: 'Traoré Bah', date: '20 Oct, 2020', ville: 'San-Pédro', amount: '224 255', status: 'Completed' },
  { id: '53326', recipient: 'Aminata Cissé', date: '09 Nov, 2023', ville: 'San-Pédro', amount: '473 382', status: 'Completed' },
  { id: '78660', recipient: 'Ouattara Gnagne', date: '24 Aug, 2021', ville: 'Abobo', amount: '353 116', status: 'Cancelled' },
  
  // Page 2
  { id: '49986', recipient: 'Diaby Diarrassouba', date: '04 Dec, 2021', ville: 'Abidjan', amount: '432 185', status: 'Completed' },
  { id: '23456', recipient: 'Koffi Kouassi', date: '12 Jan, 2023', ville: 'Yamoussoukro', amount: '289 450', status: 'Pending' },
  { id: '67890', recipient: 'Fatou Touré', date: '03 May, 2022', ville: 'Bouaké', amount: '195 320', status: 'Completed' },
  { id: '34567', recipient: 'Bamba Sekou', date: '19 Sep, 2021', ville: 'Daloa', amount: '412 890', status: 'Cancelled' },
  { id: '89012', recipient: 'Aya Koné', date: '25 Jul, 2023', ville: 'Gagnoa', amount: '178 650', status: 'Pending' },
  { id: '45678', recipient: 'Ibrahim Fofana', date: '08 Feb, 2022', ville: 'Man', amount: '336 740', status: 'Completed' },
  { id: '90123', recipient: 'Nadia Diabaté', date: '16 Nov, 2021', ville: 'Divo', amount: '256 890', status: 'Pending' },
  { id: '56789', recipient: 'Soro Moussa', date: '30 Apr, 2023', ville: 'Odienné', amount: '391 200', status: 'Cancelled' },
  { id: '12345', recipient: 'Aicha Bakayoko', date: '11 Aug, 2022', ville: 'Soubré', amount: '223 540', status: 'Completed' },
  { id: '67891', recipient: 'Lamine Coulibaly', date: '05 Dec, 2021', ville: 'Bondoukou', amount: '445 670', status: 'Pending' },
  
  // Page 3
  { id: '23457', recipient: 'Salimata Traoré', date: '22 Mar, 2023', ville: 'Ferkessédougou', amount: '312 450', status: 'Completed' },
  { id: '78901', recipient: 'Youssouf Diallo', date: '14 Jun, 2022', ville: 'Séguéla', amount: '187 920', status: 'Pending' },
  { id: '34568', recipient: 'Hawa Konaté', date: '07 Oct, 2021', ville: 'Katiola', amount: '298 760', status: 'Cancelled' },
  { id: '89013', recipient: 'Amadou Bamba', date: '29 Jan, 2023', ville: 'Boundiali', amount: '421 330', status: 'Completed' },
  { id: '45679', recipient: 'Fatoumata Sanogo', date: '18 May, 2022', ville: 'Touba', amount: '356 890', status: 'Pending' },
  { id: '90124', recipient: 'Seydou Ouattara', date: '03 Sep, 2021', ville: 'Danané', amount: '234 120', status: 'Completed' },
  { id: '56780', recipient: 'Mariame Diaby', date: '26 Nov, 2022', ville: 'Issia', amount: '389 560', status: 'Cancelled' },
  { id: '12346', recipient: 'Moustapha Koné', date: '12 Feb, 2023', ville: 'Sassandra', amount: '267 340', status: 'Pending' },
  { id: '67892', recipient: 'Kadiatou Bah', date: '20 Jul, 2022', ville: 'Tabou', amount: '412 890', status: 'Completed' },
  { id: '23458', recipient: 'Bakary Cissé', date: '08 Dec, 2021', ville: 'Grand-Bassam', amount: '198 450', status: 'Pending' }
];

const ITEMS_PER_PAGE = 10;

const App = () => {
  const [transactions, setTransactions] = useState(allTransactions); // Liste complète des transactions
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page active dans la pagination
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Transaction actuellement affichée dans le modal

  //logique de pagonation
  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const handleSelect = (id) => {
    setSelectedTransactions(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    setSelectedTransactions(prev => prev.filter(item => item !== id));
  };

  return (
    <div className='min-h-screen bg-gray-100 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
        <Header />
        <ActionsBar
          onDownload={() => console.log('Download')}
          onSortChange={() => console.log('Sort')}
        />
        
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {currentTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  isSelected={selectedTransactions.includes(transaction.id)}
                  onSelect={handleSelect}
                  onClick={handleTransactionClick}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;