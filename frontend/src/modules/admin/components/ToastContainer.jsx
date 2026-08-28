import React from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useAdminData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex items-start gap-3 animate-slide-up"
        >
          {toast.type === 'success' && <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />}
          {toast.type === 'error' && <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />}
          {toast.type === 'info' && <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />}
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
