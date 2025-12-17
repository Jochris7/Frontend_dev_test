const API_URL = 'http://localhost:5000/api';

export const api = {
  getTransactions: async () => {
    const res = await fetch(`${API_URL}/transactions`);
    if (!res.ok) throw new Error('Erreur récupération transactions');
    const data = await res.json();
    return data.data;
  },

  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Erreur récupération stats');
    const data = await res.json();
    return data.data;
  },

  createTransaction: async (transaction) => {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!res.ok) throw new Error('Erreur création');
    return (await res.json()).data;
  },

  updateTransaction: async (id, transaction) => {
    const res = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!res.ok) throw new Error('Erreur modification');
    return (await res.json()).data;
  },

  deleteTransaction: async (id) => {
    const res = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erreur suppression');
    return true;
  },
};
