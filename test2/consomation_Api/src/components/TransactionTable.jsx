import {
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Destinataire
          </th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Montant
          </th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Type
          </th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Catégorie
          </th>
          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
            Date
          </th>
          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction._id}
            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="py-4 px-4 font-medium text-gray-900">
              {transaction.recipient}
            </td>

            <td className="py-4 px-4 font-semibold text-gray-900">
              NGN {transaction.amount.toLocaleString()}
            </td>

            <td className="py-4 px-4">
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
            </td>

            <td className="py-4 px-4 text-gray-700">
              {transaction.category}
            </td>

            <td className="py-4 px-4 text-gray-600 text-sm">
              {formatDate(transaction.date)}
            </td>

            <td className="py-4 px-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDelete(transaction._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
