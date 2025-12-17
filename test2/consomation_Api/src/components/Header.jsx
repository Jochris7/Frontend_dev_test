import { Wallet } from 'lucide-react';

export default function Header({ balance }) {
  return (
    <div className="bg-linear-to-r from-emerald-800 to-teal-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Wallet /> FinRise
        </h1>
        <div className="text-white text-right">
          <p className="text-sm opacity-80">Balance Totale</p>
          <p className="text-2xl font-bold">
            NGN {balance?.toLocaleString() || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
