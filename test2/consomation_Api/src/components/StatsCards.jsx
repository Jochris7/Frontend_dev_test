import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function StatsCards({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card title="Solde" value={stats.balance} icon={<Wallet />} />
      <Card title="Total Crédit" value={stats.totalCredit} icon={<TrendingUp />} />
      <Card title="Total Débit" value={stats.totalDebit} icon={<TrendingDown />} />
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold mt-2">
        NGN {value.toLocaleString()}
      </div>
    </div>
  );
}
