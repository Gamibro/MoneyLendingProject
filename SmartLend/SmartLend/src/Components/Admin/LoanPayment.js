import React, { useState, useEffect } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiClock,
  FiFileText,
  FiUser,
  FiPercent,
  FiArrowUpRight,
  FiArrowDownRight,
  FiInfo,
  FiExternalLink,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import { useGetAllLoanPaymentsQuery } from '../../services/loanPaymentApiSlice';
import { useGetScheduleSummaryByPaymentIdQuery, useGetAllocationHistoryQuery } from '../../services/loanPaymentAllocationApiSlice';

const LoanPayment = () => {
  const { data: payments = [], isLoading, error } = useGetAllLoanPaymentsQuery();
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [expandedSchedule, setExpandedSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log('Loan Payments Data:', payments);

  const handlePaymentExpand = (paymentId) => {
    setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
    setExpandedSchedule(null);
  };

  const handleScheduleExpand = (scheduleId) => {
    setExpandedSchedule(expandedSchedule === scheduleId ? null : scheduleId);
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount || 0);
    if (isNaN(num)) return 'Rs. 0.00';
    
    // Format with commas and 2 decimal places
    const formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `Rs. ${formatted}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPaymentStatus = (payment) => {
    if (!payment) return 'pending';
    
    const paidAmount = parseFloat(payment.paidAmount || 0);
    const totalAmount = parseFloat(payment.totalPaid || 0);
    const balanceAmount = parseFloat(payment.balanceAmount || 0);
    const totalOverdue = parseFloat(payment.totalOverdue || 0);
    
    if (balanceAmount <= 0) return 'paid';
    if (totalOverdue > 0 && paidAmount > 0) return 'partial-overdue';
    if (totalOverdue > 0) return 'overdue';
    if (paidAmount > 0 && balanceAmount > 0) return 'partial';
    if (paidAmount === 0 && totalAmount > 0) return 'unpaid';
    
    return 'pending';
  };

  const getStatusBadge = (payment) => {
    const status = getPaymentStatus(payment);
    
    const statusMap = {
      paid: { 
        color: 'bg-green-100 text-green-800', 
        icon: <FiCheckCircle className="w-4 h-4" />,
        label: 'Paid'
      },
      partial: { 
        color: 'bg-blue-100 text-blue-800', 
        icon: <FiPercent className="w-4 h-4" />,
        label: 'Partially Paid'
      },
      'partial-overdue': { 
        color: 'bg-orange-100 text-orange-800', 
        icon: <FiAlertCircle className="w-4 h-4" />,
        label: 'Partial (Overdue)'
      },
      overdue: { 
        color: 'bg-red-100 text-red-800', 
        icon: <FiAlertCircle className="w-4 h-4" />,
        label: 'Overdue'
      },
      unpaid: { 
        color: 'bg-gray-100 text-gray-800', 
        icon: <FiClock className="w-4 h-4" />,
        label: 'Unpaid'
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: <FiClock className="w-4 h-4" />,
        label: 'Pending'
      },
      default: { 
        color: 'bg-gray-100 text-gray-800', 
        icon: <FiInfo className="w-4 h-4" />,
        label: 'N/A'
      }
    };

    const statusConfig = statusMap[status] || statusMap.default;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
        {statusConfig.icon}
        <span className="ml-2">{statusConfig.label}</span>
      </span>
    );
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.loanName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.paymentId?.toString().includes(searchTerm);
    
    const status = getPaymentStatus(payment);
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'overdue' && (status === 'overdue' || status === 'partial-overdue')) ||
                         (statusFilter === 'partial' && (status === 'partial' || status === 'partial-overdue')) ||
                         (statusFilter === 'paid' && status === 'paid') ||
                         (statusFilter === 'unpaid' && (status === 'unpaid' || status === 'pending'));

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading loan payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
          <FiAlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 text-center">Error Loading Data</h3>
          <p className="text-red-600 text-center mt-2">Unable to load loan payments. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Loan Repayment Tracking</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all loan repayments in one place</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">
                {filteredPayments.length} of {payments.length} Payments
              </div>
              <div className="text-xs text-gray-500">
                Showing {statusFilter === 'all' ? 'all' : statusFilter} payments
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by loan name, borrower, or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="overdue">Overdue Only</option>
                <option value="partial">Partially Paid</option>
                <option value="paid">Fully Paid</option>
                <option value="unpaid">Not Paid</option>
              </select>
              
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                <FiFilter className="w-5 h-5" />
                <span className="font-medium">Reset</span>
              </button>
            </div>
          </div>
          
          {/* Status Summary */}
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="text-sm text-gray-600 mr-4">Payment Status:</div>
            {['all', 'overdue', 'partial', 'paid', 'unpaid'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  statusFilter === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Grid */}
        <div className="space-y-6">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <FiCreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No Payments Found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <PaymentCard
                key={payment.paymentId}
                payment={payment}
                expanded={expandedPayment === payment.paymentId}
                onExpand={() => handlePaymentExpand(payment.paymentId)}
                expandedSchedule={expandedSchedule}
                onScheduleExpand={handleScheduleExpand}
                formatCurrency={formatCurrency}
                getStatusBadge={() => getStatusBadge(payment)}
                formatDate={formatDate}
                getPaymentStatus={getPaymentStatus}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentCard = ({ 
  payment, 
  expanded, 
  onExpand, 
  expandedSchedule, 
  onScheduleExpand,
  formatCurrency,
  getStatusBadge,
  formatDate,
  getPaymentStatus
}) => {
  console.log('Rendering PaymentCard for Payment ID:', payment.paymentId);
  
  const { data: schedules = [] } = useGetScheduleSummaryByPaymentIdQuery(
    payment.paymentId,
    {
      skip: !expanded || !payment.paymentId
    }
  );

  const totalAmount = parseFloat(payment.totalPaid || 0);
  const paidAmount = parseFloat(payment.paidAmount || 0);
  const balanceAmount = parseFloat(payment.balanceAmount || 0);
  const progress = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
  const paymentStatus = getPaymentStatus(payment);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${
              paymentStatus === 'paid' ? 'bg-green-100' :
              paymentStatus === 'partial' ? 'bg-blue-100' :
              paymentStatus === 'overdue' ? 'bg-red-100' :
              'bg-gray-100'
            }`}>
              <FiCreditCard className={`w-8 h-8 ${
                paymentStatus === 'paid' ? 'text-green-600' :
                paymentStatus === 'partial' ? 'text-blue-600' :
                paymentStatus === 'overdue' ? 'text-red-600' :
                'text-gray-600'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-900">{payment.loanName || 'Unnamed Loan'}</h3>
                {getStatusBadge()}
                <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                  ID: {payment.paymentId}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FiUser className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{payment.borrowerName || 'Unknown Borrower'}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onExpand}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {expanded ? (
              <FiChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <FiChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <StatCard
            label="Total Amount"
            value={formatCurrency(totalAmount)}
            icon={<FiDollarSign className="w-5 h-5" />}
            color="blue"
            trend="neutral"
          />
          
          <StatCard
            label="Paid Amount"
            value={formatCurrency(paidAmount)}
            icon={<FiTrendingUp className="w-5 h-5" />}
            color="green"
            trend="up"
            percentage={progress}
          />
          
          <StatCard
            label="Balance"
            value={formatCurrency(balanceAmount)}
            icon={<FiTrendingDown className="w-5 h-5" />}
            color={balanceAmount > 0 ? 'red' : 'green'}
            trend={balanceAmount > 0 ? 'down' : 'up'}
          />
          
          <StatCard
            label="Total Overdue"
            value={formatCurrency(payment.totalOverdue || 0)}
            icon={<FiAlertCircle className="w-5 h-5" />}
            color={payment.totalOverdue > 0 ? 'orange' : 'gray'}
            trend={payment.totalOverdue > 0 ? 'warning' : 'neutral'}
          />
          
          <StatCard
            label="Paid Overdue"
            value={formatCurrency(payment.paidOverdue || 0)}
            icon={<FiCheckCircle className="w-5 h-5" />}
            color="green"
            trend="up"
          />
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            {paymentStatus === 'partial' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-600">
                  Partially Paid ({progress.toFixed(1)}%)
                </span>
              </div>
            )}
            {paymentStatus === 'partial-overdue' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-orange-600">
                  Partial (Overdue: {formatCurrency(payment.totalOverdue)})
                </span>
              </div>
            )}
            {paymentStatus === 'overdue' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600">
                  Overdue: {formatCurrency(payment.totalOverdue)}
                </span>
              </div>
            )}
          </div>
          
          {payment.lastUpdatedDate && (
            <div className="text-sm text-gray-500">
              Last Updated: {formatDate(payment.lastUpdatedDate)}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Repayment Progress</span>
            <span className="text-sm font-semibold text-blue-600">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                paymentStatus === 'paid' ? 'bg-green-500' :
                paymentStatus === 'partial' ? 'bg-blue-500' :
                paymentStatus === 'overdue' ? 'bg-red-500' :
                'bg-gray-400'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Rs. 0</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content - Schedules */}
      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Payment Schedules</h4>
            <span className="text-sm text-gray-500">{schedules.length} schedule(s)</span>
          </div>

          {schedules.length === 0 ? (
            <div className="text-center py-8">
              <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No payment schedules found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.scheduleId || schedule.ScheduleId}
                  schedule={schedule}
                  paymentId={payment.paymentId}
                  expanded={expandedSchedule === (schedule.scheduleId || schedule.ScheduleId)}
                  onExpand={() => onScheduleExpand(schedule.scheduleId || schedule.ScheduleId)}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color, trend, percentage }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    orange: 'bg-orange-50 text-orange-700',
    gray: 'bg-gray-50 text-gray-700'
  };

  const trendIcons = {
    up: <FiArrowUpRight className="w-4 h-4" />,
    down: <FiArrowDownRight className="w-4 h-4" />,
    warning: <FiAlertCircle className="w-4 h-4" />,
    neutral: null
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.gray}`}>
          {icon}
        </div>
        {trend && trendIcons[trend] && (
          <div className={`p-1 rounded ${
            trend === 'up' ? 'bg-green-100 text-green-600' : 
            trend === 'down' ? 'bg-red-100 text-red-600' : 
            'bg-orange-100 text-orange-600'
          }`}>
            {trendIcons[trend]}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
      {percentage !== undefined && (
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {percentage.toFixed(1)}%
          </div>
        </div>
      )}
    </div>
  );
};

const ScheduleCard = ({ 
  schedule, 
  paymentId, 
  expanded, 
  onExpand,
  formatCurrency,
  formatDate
}) => {
  const scheduleId = schedule.scheduleId || schedule.ScheduleId;
  const installmentNo = schedule.installmentNo || schedule.InstallmentNo;
  const scheduleStatus = schedule.scheduleStatus || schedule.ScheduleStatus;
  const dueDate = schedule.dueDate || schedule.DueDate;
  const totalDue = schedule.totalDue || schedule.TotalDue;
  const feesDue = schedule.feesDue || schedule.FeesDue;
  const paidSoFar = schedule.paidSoFar || schedule.PaidSoFar;
  const remainingTotal = schedule.remainingTotal || schedule.RemainingTotal;
  
  const { data: allocations = [] } = useGetAllocationHistoryQuery(
    { 
      paymentId, 
      scheduleId 
    },
    {
      skip: !expanded || !paymentId || !scheduleId,
    }
  );

  const getScheduleStatusBadge = (status) => {
    const statusMap = {
      paid: { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="w-4 h-4" /> },
      partial: { color: 'bg-blue-100 text-blue-800', icon: <FiPercent className="w-4 h-4" /> },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FiClock className="w-4 h-4" /> },
      overdue: { color: 'bg-red-100 text-red-800', icon: <FiAlertCircle className="w-4 h-4" /> },
      default: { color: 'bg-gray-100 text-gray-800', icon: <FiInfo className="w-4 h-4" /> }
    };

    const statusLower = status?.toLowerCase();
    const statusConfig = statusMap[statusLower] || statusMap.default;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
        {statusConfig.icon}
        <span className="ml-2 capitalize">{status || 'N/A'}</span>
      </span>
    );
  };

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
      {/* Schedule Header */}
      <div className="p-4 hover:bg-blue-100/50 cursor-pointer transition-colors" onClick={onExpand}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FiCalendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h5 className="font-semibold text-gray-900">
                  Installment #{installmentNo}
                </h5>
                {getScheduleStatusBadge(scheduleStatus)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FiClock className="w-4 h-4" />
                <span>Due: {formatDate(dueDate)}</span>
                <span className="mx-2">•</span>
                <span>Schedule ID: {scheduleId}</span>
              </div>
            </div>
          </div>
          
          <button className="p-1 hover:bg-blue-200 rounded transition-colors">
            {expanded ? (
              <FiChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>

        {/* Schedule Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div>
            <label className="text-xs text-gray-600">Total Due</label>
            <div className="font-semibold text-gray-900">{formatCurrency(totalDue)}</div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Fees Due</label>
            <div className="font-semibold text-gray-900">{formatCurrency(feesDue)}</div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Paid So Far</label>
            <div className="font-semibold text-green-600">{formatCurrency(paidSoFar)}</div>
          </div>
          <div>
            <label className="text-xs text-gray-600">Remaining Total</label>
            <div className={`font-semibold ${parseFloat(remainingTotal) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(remainingTotal)}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Allocation History */}
      {expanded && (
        <div className="border-t border-blue-200 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h6 className="font-semibold text-gray-900">Allocation History</h6>
            <span className="text-sm text-gray-500">{allocations.length} record(s)</span>
          </div>

          {allocations.length === 0 ? (
            <div className="text-center py-4">
              <FiFileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No allocation records found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Allocation ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Paid Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        To Overdue
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allocations.map((allocation) => (
                      <tr key={allocation.allocationId || allocation.AllocationId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {allocation.allocationId || allocation.AllocationId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FiDollarSign className="w-4 h-4 text-green-500" />
                            <span className="font-semibold text-green-600">
                              {formatCurrency(allocation.paidAmount || allocation.PaidAmount)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            (allocation.toOverdue || allocation.ToOverdue) 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {(allocation.toOverdue || allocation.ToOverdue) ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {allocation.paymentMethod || allocation.PaymentMethod}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                          {allocation.referenceNo || allocation.ReferenceNo}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(allocation.allocatedAt || allocation.AllocatedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Allocation Details Summary */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Total Allocated</div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatCurrency(allocations.reduce((sum, a) => sum + parseFloat(a.paidAmount || a.PaidAmount || 0), 0))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">To Overdue</div>
                    <div className="text-lg font-semibold text-orange-600">
                      {formatCurrency(
                        allocations
                          .filter(a => a.toOverdue || a.ToOverdue)
                          .reduce((sum, a) => sum + parseFloat(a.paidAmount || a.PaidAmount || 0), 0)
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Payment Methods</div>
                    <div className="text-sm font-medium text-gray-900">
                      {[...new Set(allocations.map(a => a.paymentMethod || a.PaymentMethod))].join(', ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Last Allocation</div>
                    <div className="text-sm font-medium text-gray-900">
                      {allocations.length > 0 
                        ? formatDate(allocations[allocations.length - 1].allocatedAt || allocations[allocations.length - 1].AllocatedAt) 
                        : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanPayment;