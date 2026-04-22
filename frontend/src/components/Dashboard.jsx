import React from 'react';
import { Package, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = ({ assets }) => {
  const stats = {
    total: assets.length,
    inUse: assets.filter(a => a.status === 'In Use').length,
    inStock: assets.filter(a => a.status === 'In Stock').length,
    others: assets.filter(a => !['In Use', 'In Stock'].includes(a.status)).length
  };

  const cards = [
    { label: 'Total Assets', value: stats.total, icon: <Package size={24} style={{color: '#3b82f6'}} />, color: 'border-l-4 border-blue-500' },
    { label: 'In Use', value: stats.inUse, icon: <CheckCircle size={24} style={{color: '#10b981'}} />, color: 'border-l-4 border-emerald-500' },
    { label: 'In Stock', value: stats.inStock, icon: <Package size={24} style={{color: '#f59e0b'}} />, color: 'border-l-4 border-amber-500' },
    { label: 'Issues/Others', value: stats.others, icon: <AlertCircle size={24} style={{color: '#ef4444'}} />, color: 'border-l-4 border-rose-500' }
  ];

  return (
    <div className="dashboard-grid">
      {cards.map((card, idx) => (
        <div key={idx} className={`stat-card ${card.color}`}>
          <div>
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
          </div>
          <div className="card-icon">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
