import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const AddLoanProduct = ({ isOpen, onClose, onAdd, isLoading }) => {
  const [formData, setFormData] = useState({
    loanProductName: '',
    interestRate: '',
    defaultTermMonths: '',
    lateFeeFixedAmount: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.loanProductName.trim()) {
      newErrors.loanProductName = 'Loan Product Name is required';
    }

    if (!formData.interestRate || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = 'Interest Rate must be a positive decimal';
    }

    if (!formData.defaultTermMonths || !Number.isInteger(parseFloat(formData.defaultTermMonths)) || parseFloat(formData.defaultTermMonths) <= 0) {
      newErrors.defaultTermMonths = 'Default Term Months must be a positive integer';
    }

    if (!formData.lateFeeFixedAmount || parseFloat(formData.lateFeeFixedAmount) < 0) {
      newErrors.lateFeeFixedAmount = 'Late Fee Fixed Amount must be a positive decimal';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload with correct data types
    const payload = {
      loanProductName: formData.loanProductName.trim(),
      interestRate: parseFloat(formData.interestRate), // decimal
      defaultTermMonths: parseInt(formData.defaultTermMonths), // integer
      lateFeeFixedAmount: parseFloat(formData.lateFeeFixedAmount), // decimal
    };

    try {
      await onAdd(payload);
      // Reset form on success
      setFormData({
        loanProductName: '',
        interestRate: '',
        defaultTermMonths: '',
        lateFeeFixedAmount: '',
      });
      setErrors({});
      onClose();
    } catch (err) {
      console.error('Error adding loan product:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-2xl max-w-md w-full">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 rounded-xl to-cyan-600 px-6 py-6 border-b border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FontAwesomeIcon icon={faPlus} className="text-white text-lg" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Loan Product</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
            title="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Loan Product Name */}
          <div>
            <label className="block text-sm font-semibold text-blue-300 mb-2">
              Loan Product Name
            </label>
            <input
              type="text"
              name="loanProductName"
              value={formData.loanProductName}
              onChange={handleChange}
              placeholder="e.g., Personal Loan"
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-700 border transition focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                errors.loanProductName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.loanProductName && (
              <p className="text-red-400 text-xs mt-1">{errors.loanProductName}</p>
            )}
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-blue-300 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="e.g., 10.5"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-700 border transition focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                errors.interestRate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.interestRate && (
              <p className="text-red-400 text-xs mt-1">{errors.interestRate}</p>
            )}
          </div>

          {/* Default Term Months */}
          <div>
            <label className="block text-sm font-semibold text-blue-300 mb-2">
              Default Term (Months)
            </label>
            <input
              type="number"
              name="defaultTermMonths"
              value={formData.defaultTermMonths}
              onChange={handleChange}
              placeholder="e.g., 24"
              step="1"
              min="1"
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-700 border transition focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                errors.defaultTermMonths
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.defaultTermMonths && (
              <p className="text-red-400 text-xs mt-1">{errors.defaultTermMonths}</p>
            )}
          </div>

          {/* Late Fee Fixed Amount */}
          <div>
            <label className="block text-sm font-semibold text-blue-300 mb-2">
              Late Fee Fixed Amount ($)
            </label>
            <input
              type="number"
              name="lateFeeFixedAmount"
              value={formData.lateFeeFixedAmount}
              onChange={handleChange}
              placeholder="e.g., 25.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2.5 rounded-lg bg-slate-700 border transition focus:outline-none focus:ring-2 text-white placeholder-gray-400 ${
                errors.lateFeeFixedAmount
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {errors.lateFeeFixedAmount && (
              <p className="text-red-400 text-xs mt-1">{errors.lateFeeFixedAmount}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition border border-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold transition shadow-lg hover:shadow-green-500/30"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoanProduct;
