import {
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export default function TransactionMobile({ transactions, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="bg-gray-50 rounded-xl p-4 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {transaction.recipient}
              </h3>
              <p className="text-sm text-gray-600">
                {transaction.category}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                transaction.type === 'Credit'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {transaction.type === 'Credit' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {transaction.type}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              NGN {transaction.amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(transaction.date)}
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <button
              onClick={() => onEdit(transaction)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Modifier
            </button>

            <button
              onClick={() => onDelete(transaction._id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
