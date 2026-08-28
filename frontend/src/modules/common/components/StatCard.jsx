import React from 'react';

export default function StatCard({ title, value, secondaryText, icon: Icon, trend }) {
  const isPositive = trend === 'up' || (secondaryText && secondaryText.includes('+'));
  const isNegative = trend === 'down' || (secondaryText && secondaryText.includes('-'));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {secondaryText && (
          <p className={`text-sm mt-1 flex items-center ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'}`}>
            {secondaryText}
          </p>
        )}
      </div>
    </div>
  );
}
