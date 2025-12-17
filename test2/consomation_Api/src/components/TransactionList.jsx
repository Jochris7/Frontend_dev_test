import TransactionTable from './TransactionTable';
import TransactionMobile from './TransactionMobile';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <>
      <div className="hidden md:block">
        <TransactionTable
          transactions={transactions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <div className="md:hidden">
        <TransactionMobile
          transactions={transactions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}
