import React, { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, Edit2, X, TrendingUp, TrendingDown, Wallet, Send, Receipt, AlertCircle } from 'lucide-react';


const API_URL = 'http://localhost:5000/api';

// Service API
const api = {
  // Récupérer toutes les transactions
  getTransactions: async () => {
    const response = await fetch(`${API_URL}/transactions`);
    if (!response.ok) throw new Error('Erreur lors de la récupération');
    const data = await response.json();
    return data.data;
  },

  // Récupérer les statistiques
  getStats: async () => {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des stats');
    const data = await response.json();
    return data.data;
  },

  // Créer une transaction
  createTransaction: async (transaction) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    const data = await response.json();
    return data.data;
  },

  // Mettre à jour une transaction
  updateTransaction: async (id, transaction) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    const data = await response.json();
    return data.data;
  },

  // Supprimer une transaction
  deleteTransaction: async (id) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return true;
  }
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    type: 'Debit',
    category: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [transactionsData, statsData] = await Promise.all([
        api.getTransactions(),
        api.getStats()
      ]);
      setTransactions(transactionsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Erreur de connexion au serveur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.recipient || !formData.amount || !formData.category) {
      setError('Tous les champs sont requis');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      if (editingTransaction) {
        await api.updateTransaction(editingTransaction._id, formData);
      } else {
        await api.createTransaction(formData);
      }
      
      await fetchData();
      closeModal();
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette transaction ?')) return;
    
    try {
      setLoading(true);
      await api.deleteTransaction(id);
      await fetchData();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (transaction = null) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        recipient: transaction.recipient,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category
      });
    } else {
      setEditingTransaction(null);
      setFormData({ recipient: '', amount: '', type: 'Debit', category: '' });
    }
    setShowModal(true);
    setError(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
    setFormData({ recipient: '', amount: '', type: 'Debit', category: '' });
    setError(null);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-900 via-teal-900 to-slate-900">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-8 h-8" />
              FinTechCrud
            </h1>
            <div className="text-white text-center sm:text-right">
              <div className="text-sm opacity-90">Balance Totale</div>
              <div className="text-xl sm:text-2xl font-bold">
                NGN {stats ? stats.balance.toLocaleString() : '0'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error Alert Pour afficher l'erreur au cas ou il y a erreru*/}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Erreur</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Solde Actuel</span>
              <Wallet className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              NGN {stats ? stats.balance.toLocaleString() : '0'}
            </div>
            <div className="text-xs text-emerald-600 mt-1">Disponible</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Crédit</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              NGN {stats ? stats.totalCredit.toLocaleString() : '0'}
            </div>
            <div className="text-xs text-green-600 mt-1">Entrées</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Débit</span>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              NGN {stats ? stats.totalDebit.toLocaleString() : '0'}
            </div>
            <div className="text-xs text-red-600 mt-1">Sorties</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Receipt className="w-6 h-6" />
                Transactions
              </h2>
              <button
                onClick={() => openModal()}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Nouvelle Transaction
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading && transactions.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                <span className="ml-3 text-gray-600">Chargement...</span>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Aucune transaction</p>
                <p className="text-sm">Cliquez sur "Nouvelle Transaction" pour commencer</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                {/* Desktop Table */}
                <table className="w-full hidden md:table">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Destinataire</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Montant</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Catégorie</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{transaction.recipient}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">
                            NGN {transaction.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === 'Credit' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'Credit' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700">{transaction.category}</span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openModal(transaction)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(transaction._id)}
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

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4 px-4">
                  {transactions.map((transaction) => (
                    <div key={transaction._id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-lg">{transaction.recipient}</div>
                          <div className="text-sm text-gray-600 mt-1">{transaction.category}</div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.type === 'Credit' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type === 'Credit' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
                          onClick={() => openModal(transaction)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(transaction._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTransaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destinataire *
                </label>
                <input
                  type="text"
                  value={formData.recipient}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Nom du destinataire"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Montant (NGN) *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="Debit">Débit (Sortie)</option>
                  <option value="Credit">Crédit (Entrée)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Ex: Loisirs, Food, Salaire..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {editingTransaction ? 'Modifier' : 'Créer'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;