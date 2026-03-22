import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const RejectionMessageForm = ({ application, onSubmit, onCancel, isLoading }) => {
  const [reason, setReason] = useState('The amount is too much');

  const handleSubmit = () => {
    onSubmit(reason);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl max-w-sm w-full border border-slate-600 overflow-hidden max-h-96">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 px-4 py-3 border-b border-slate-600">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Rejection Message</h2>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="text-white hover:bg-red-700 p-2 rounded-lg transition disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 space-y-2 overflow-y-auto max-h-64">
          {/* Application ID */}
          <div>
            <label className="block text-xs font-bold text-blue-300 mb-1">Application ID</label>
            <input
              type="text"
              value={application.applicationId}
              disabled
              className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 font-medium cursor-not-allowed text-sm"
            />
          </div>

          {/* Loan Product Name */}
          <div>
            <label className="block text-xs font-bold text-blue-300 mb-1">Loan Product</label>
            <input
              type="text"
              value={application.loanProductName}
              disabled
              className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 font-medium cursor-not-allowed text-sm"
            />
          </div>

          {/* Borrower Name */}
          <div>
            <label className="block text-xs font-bold text-blue-300 mb-1">Borrower Name</label>
            <input
              type="text"
              value={application.borrowerName}
              disabled
              className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 font-medium cursor-not-allowed text-sm"
            />
          </div>

          {/* Borrower Phone */}
          <div>
            <label className="block text-xs font-bold text-blue-300 mb-1">Borrower Phone</label>
            <input
              type="text"
              value={application.phone}
              disabled
              className="w-full px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 font-medium cursor-not-allowed text-sm"
            />
          </div>

          {/* Reason of Rejection */}
          <div>
            <label className="block text-xs font-bold text-red-300 mb-1">Reason of Rejection *</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 bg-slate-700 border border-red-500/40 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/50 resize-none h-16 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
              placeholder="Enter reason..."
            />
            <p className="text-xs text-slate-400 mt-1">
              {reason.length}/200 characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-700/50 border-t border-slate-600 px-3 py-3 flex gap-2 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-1.5 rounded-lg font-bold text-slate-200 border border-slate-500 hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !reason.trim()}
            className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/30 text-sm"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionMessageForm;
