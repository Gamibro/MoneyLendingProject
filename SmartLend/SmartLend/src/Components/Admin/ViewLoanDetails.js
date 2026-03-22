


// import React, { useState } from "react";
// import { useGetRepaymentScheduleByLoanIdQuery } from "../../services/repaymentScheduleApiSlice";
// import {
//   FiDollarSign,
//   FiPercent,
//   FiCalendar,
//   FiUser,
//   FiChevronDown,
//   FiFilter,
//   FiX,
//   FiCheckCircle,
//   FiClock,
//   FiAlertCircle,
//   FiTrendingUp
// } from "react-icons/fi";

// const ViewLoanDetails = ({ loan, onClose }) => {
//   const loanId = loan.loanId || loan.id;
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
//   const { data: schedule = [], isLoading: scheduleLoading, isError: scheduleError } = 
//     useGetRepaymentScheduleByLoanIdQuery(loanId);

//   // Filter schedule based on selected status
//   const filteredSchedule = schedule.filter(item => {
//     if (statusFilter === "all") return true;
//     return item.status?.toLowerCase() === statusFilter.toLowerCase();
//   });

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       "Fully Paid": {
//         bg: "bg-emerald-50",
//         text: "text-emerald-700",
//         border: "border-emerald-200",
//         icon: <FiCheckCircle className="w-3.5 h-3.5 mr-1" />
//       },
//       "Pending": {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         icon: <FiClock className="w-3.5 h-3.5 mr-1" />
//       },
//       "Partially Paid": {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//         icon: <FiTrendingUp className="w-3.5 h-3.5 mr-1" />
//       },
//       "Overdue": {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         icon: <FiAlertCircle className="w-3.5 h-3.5 mr-1" />
//       }
//     };

//     const config = statusConfig[status] || {
//       bg: "bg-gray-50",
//       text: "text-gray-700",
//       border: "border-gray-200",
//       icon: null
//     };

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} border`}>
//         {config.icon}
//         {status || "N/A"}
//       </span>
//     );
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount || 0);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Calculate summary statistics
//   const calculateSummary = () => {
//     const totalAmount = filteredSchedule.reduce((sum, item) => sum + (item.totalDue || 0), 0);
//     const totalFees = filteredSchedule.reduce((sum, item) => sum + (item.feesDue || 0), 0);
//     const paidCount = filteredSchedule.filter(item => item.status === "Fully Paid").length;
    
//     return {
//       totalAmount: formatCurrency(totalAmount),
//       totalFees: formatCurrency(totalFees),
//       paidCount,
//       totalCount: filteredSchedule.length
//     };
//   };

//   const summary = calculateSummary();

//   if (scheduleLoading) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
//           <p className="text-gray-600">Loading repayment schedule...</p>
//         </div>
//       </div>
//     );
//   }

//   if (scheduleError) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-2xl p-8 max-w-md">
//           <div className="text-red-500 mb-4 text-center">
//             <FiAlertCircle className="w-12 h-12 mx-auto" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Error Loading Data</h3>
//           <p className="text-gray-600 text-center mb-6">Unable to load repayment schedule. Please try again.</p>
//           <button
//             onClick={onClose}
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const filterOptions = [
//     { value: "all", label: "All Statuses", color: "text-gray-600" },
//     { value: "Fully Paid", label: "Fully Paid", color: "text-emerald-600" },
//     { value: "Pending", label: "Pending", color: "text-amber-600" },
//     { value: "Partially Paid", label: "Partially Paid", color: "text-blue-600" },
//     { value: "Overdue", label: "Overdue", color: "text-red-600" }
//   ];

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-2xl p-6 z-10">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
//               <p className="text-gray-600 mt-1">View complete loan information and repayment schedule</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               aria-label="Close"
//             >
//               <FiX className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {/* Loan Summary Card */}
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-bold mb-2">{loan.borrowerName || "N/A"}</h3>
//                 <p className="text-indigo-100">Loan #{loanId}</p>
//               </div>
//               <div className="mt-4 md:mt-0 text-right">
//                 <p className="text-2xl font-bold">{formatCurrency(loan.principalAmount)}</p>
//                 <p className="text-indigo-100">Principal Amount</p>
//               </div>
//             </div>
//           </div>

//           {/* Loan Details Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiUser className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Borrower</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">{loan.borrowerName || "N/A"}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiPercent className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Interest Rate</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">{loan.interestRate ? `${loan.interestRate}%` : "N/A"}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiCalendar className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Term</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">{loan.termMonths ? `${loan.termMonths} months` : "N/A"}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiCalendar className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Start Date</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">{formatDate(loan.startDate)}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiDollarSign className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Total Payable</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">{formatCurrency(loan.totalPayable || loan.principalAmount)}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
//               <div className="flex items-center text-gray-600 mb-2">
//                 <FiDollarSign className="w-5 h-5 mr-2" />
//                 <span className="text-sm font-medium">Remaining Balance</span>
//               </div>
//               <p className="text-lg font-semibold text-gray-900">
//                 {formatCurrency(loan.remainingBalance || loan.principalAmount)}
//               </p>
//             </div>
//           </div>

//           {/* Repayment Schedule Section */}
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             {/* Section Header with Filter */}
//             <div className="border-b border-gray-200 p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Repayment Schedule</h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {summary.paidCount} of {summary.totalCount} installments paid
//                   </p>
//                 </div>
                
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//                     className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <FiFilter className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm font-medium">
//                       {filterOptions.find(opt => opt.value === statusFilter)?.label || "Filter by Status"}
//                     </span>
//                     <FiChevronDown className="w-4 h-4 text-gray-500" />
//                   </button>
                  
//                   {showFilterDropdown && (
//                     <>
//                       <div 
//                         className="fixed inset-0 z-20" 
//                         onClick={() => setShowFilterDropdown(false)}
//                       />
//                       <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
//                         <div className="py-1">
//                           {filterOptions.map((option) => (
//                             <button
//                               key={option.value}
//                               onClick={() => {
//                                 setStatusFilter(option.value);
//                                 setShowFilterDropdown(false);
//                               }}
//                               className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center justify-between ${
//                                 statusFilter === option.value ? "bg-indigo-50 text-indigo-700" : "text-gray-700"
//                               }`}
//                             >
//                               <span className={option.color}>{option.label}</span>
//                               {statusFilter === option.value && (
//                                 <FiCheckCircle className="w-4 h-4 text-indigo-600" />
//                               )}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
              
//               {/* Summary Stats */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Total Due Amount</p>
//                   <p className="text-lg font-semibold text-gray-900">{summary.totalAmount}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Total Fees Due</p>
//                   <p className="text-lg font-semibold text-gray-900">{summary.totalFees}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Showing</p>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {filteredSchedule.length} of {schedule.length} installments
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Installment #
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Due Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Total Due
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Fees Due
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredSchedule.length > 0 ? (
//                     filteredSchedule.map((item, index) => (
//                       <tr 
//                         key={item.scheduleId} 
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center mr-3">
//                               <span className="text-indigo-700 font-medium">{item.installmentNo}</span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 Installment #{item.installmentNo}
//                               </div>
//                               <div className="text-xs text-gray-500">ID: {item.scheduleId}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{formatDate(item.dueDate)}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-semibold text-gray-900">
//                             {formatCurrency(item.totalDue)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-600">
//                             {formatCurrency(item.feesDue)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <StatusBadge status={item.status} />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-12 text-center">
//                         <div className="text-gray-500">
//                           <FiFilter className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                           <p className="text-lg font-medium">No installments found</p>
//                           <p className="text-sm mt-1">Try changing your filter criteria</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-100 rounded-b-2xl p-6">
//           <div className="flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Close Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewLoanDetails;



import React, { useState } from "react";
import { useGetRepaymentScheduleByLoanIdQuery } from "../../services/repaymentScheduleApiSlice";
import {
  FiDollarSign,
  FiPercent,
  FiCalendar,
  FiUser,
  FiChevronDown,
  FiFilter,
  FiX,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiBarChart2,
  FiPieChart,
  FiCreditCard
} from "react-icons/fi";

const ViewLoanDetails = ({ loan, onClose }) => {
  const loanId = loan.loanId || loan.id;
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  const { data: schedule = [], isLoading: scheduleLoading, isError: scheduleError } = 
    useGetRepaymentScheduleByLoanIdQuery(loanId);

  // Calculate financial metrics
  const calculateFinancials = () => {
    const totalPayable = loan.totalPayable || loan.principalAmount;
    
    // Calculate total paid from Fully Paid and Partially Paid installments
    const paidAmount = schedule.reduce((sum, item) => {
      if (item.status === "Fully Paid" || item.status === "Partially Paid") {
        return sum + (item.totalDue || 0);
      }
      return sum;
    }, 0);
    
    // Calculate remaining balance
    const remainingBalance = Math.max(0, totalPayable - paidAmount);
    
    // Calculate overdue metrics
    const overdueItems = schedule.filter(item => item.status === "Overdue");
    const overdueAmount = overdueItems.reduce((sum, item) => sum + (item.totalDue || 0), 0);
    const overdueCount = overdueItems.length;
    
    // Calculate status counts
    const statusCounts = {
      fullyPaid: schedule.filter(item => item.status === "Fully Paid").length,
      partiallyPaid: schedule.filter(item => item.status === "Partially Paid").length,
      pending: schedule.filter(item => item.status === "Pending").length,
      overdue: overdueCount,
      total: schedule.length
    };
    
    // Calculate completion percentage
    const completionPercentage = statusCounts.total > 0 
      ? Math.round(((statusCounts.fullyPaid) / statusCounts.total) * 100) 
      : 0;

    return {
      remainingBalance,
      paidAmount,
      overdueAmount,
      overdueCount,
      statusCounts,
      completionPercentage,
      totalPayable
    };
  };

  // Filter schedule based on selected status
  const filteredSchedule = schedule.filter(item => {
    if (statusFilter === "all") return true;
    return item.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  const financials = calculateFinancials();

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      "Fully Paid": {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: <FiCheckCircle className="w-3.5 h-3.5 mr-1" />
      },
      "Pending": {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: <FiClock className="w-3.5 h-3.5 mr-1" />
      },
      "Partially Paid": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: <FiTrendingUp className="w-3.5 h-3.5 mr-1" />
      },
      "Overdue": {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <FiAlertCircle className="w-3.5 h-3.5 mr-1" />
      }
    };

    const config = statusConfig[status] || {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      icon: null
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border} border`}>
        {config.icon}
        {status || "N/A"}
      </span>
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate summary statistics for filtered schedule
  const calculateSummary = () => {
    const totalAmount = filteredSchedule.reduce((sum, item) => sum + (item.totalDue || 0), 0);
    const totalFees = filteredSchedule.reduce((sum, item) => sum + (item.feesDue || 0), 0);
    const paidCount = filteredSchedule.filter(item => item.status === "Fully Paid").length;
    
    return {
      totalAmount: formatCurrency(totalAmount),
      totalFees: formatCurrency(totalFees),
      paidCount,
      totalCount: filteredSchedule.length
    };
  };

  const summary = calculateSummary();

  if (scheduleLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 flex flex-col items-center shadow-2xl">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiBarChart2 className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-4">Loading loan details...</p>
        </div>
      </div>
    );
  }

  if (scheduleError) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
          <div className="text-red-500 mb-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full">
              <FiAlertCircle className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Error Loading Data</h3>
          <p className="text-gray-600 text-center mb-6">Unable to load repayment schedule. Please try again.</p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const filterOptions = [
    { value: "all", label: "All Statuses", icon: <FiFilter className="w-4 h-4" /> },
    { value: "Fully Paid", label: "Fully Paid", icon: <FiCheckCircle className="w-4 h-4 text-emerald-500" /> },
    { value: "Pending", label: "Pending", icon: <FiClock className="w-4 h-4 text-amber-500" /> },
    { value: "Partially Paid", label: "Partially Paid", icon: <FiTrendingUp className="w-4 h-4 text-blue-500" /> },
    { value: "Overdue", label: "Overdue", icon: <FiAlertCircle className="w-4 h-4 text-red-500" /> }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200/50">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-white to-gray-50/90 backdrop-blur-sm border-b border-gray-200/50 rounded-t-3xl px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Loan Overview
              </h2>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <FiCreditCard className="w-4 h-4" />
                Detailed analysis and repayment tracking for loan #{loanId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              aria-label="Close"
            >
              <FiX className="w-6 h-6 text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Loan Overview Card */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{loan.borrowerName || "N/A"}</h3>
                    <p className="text-indigo-100/90">Primary Borrower</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-6">
                  <div>
                    <p className="text-indigo-100/80 text-sm">Loan Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        financials.remainingBalance === 0 ? 'bg-emerald-400' : 
                        financials.overdueCount > 0 ? 'bg-red-400' : 'bg-amber-400'
                      }`}></div>
                      <span className="font-medium">
                        {financials.remainingBalance === 0 ? 'Fully Paid' : 
                         financials.overdueCount > 0 ? 'Overdue' : 'Active'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-indigo-100/80 text-sm">Completion</p>
                    <p className="font-medium">{financials.completionPercentage}%</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0 text-right">
                <p className="text-4xl font-bold mb-2">{formatCurrency(loan.principalAmount)}</p>
                <p className="text-indigo-100/90">Principal Amount</p>
                <div className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500 rounded-full"
                    style={{ width: `${financials.completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">{financials.completionPercentage}% repaid</p>
              </div>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Payable */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 hover:border-indigo-200/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <FiDollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Total Payable</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financials.totalPayable)}</p>
              <p className="text-sm text-gray-500 mt-2">Original loan amount plus interest</p>
            </div>

            {/* Remaining Balance */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 hover:border-emerald-200/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                  <FiTrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Remaining Balance</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financials.remainingBalance)}</p>
              <p className="text-sm text-gray-500 mt-2">
                {financials.remainingBalance === 0 ? 'Loan fully repaid' : `${formatCurrency(financials.paidAmount)} paid so far`}
              </p>
            </div>

            {/* Overdue Amount */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 hover:border-red-200/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                  <FiAlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Overdue Amount</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(financials.overdueAmount)}</p>
              <p className="text-sm text-gray-500 mt-2">
                {financials.overdueCount} installment{financials.overdueCount !== 1 ? 's' : ''} overdue
              </p>
            </div>

            {/* Completion Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/70 hover:border-purple-200/50 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                  <FiPieChart className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Completion</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{financials.completionPercentage}%</p>
              <p className="text-sm text-gray-500 mt-2">
                {financials.statusCounts.fullyPaid} of {financials.statusCounts.total} installments paid
              </p>
            </div>
          </div>

          {/* Loan Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Interest Rate */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <FiPercent className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Interest Rate</p>
                  <p className="text-xl font-bold text-blue-900">{loan.interestRate ? `${loan.interestRate}%` : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Term */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <FiCalendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-700">Term</p>
                  <p className="text-xl font-bold text-amber-900">{loan.termMonths ? `${loan.termMonths} months` : "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <FiCalendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">Start Date</p>
                  <p className="text-xl font-bold text-emerald-900">{formatDate(loan.startDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Repayment Schedule Section */}
          <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg">
            {/* Section Header */}
            <div className="border-b border-gray-200/50 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Repayment Schedule
                  </h3>
                  <p className="text-gray-600 mt-2">Track all scheduled payments and their status</p>
                </div>
                
                {/* Filter and Status Summary */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Status Summary */}
                  <div className="flex items-center gap-4 bg-gray-50/80 px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-600">{financials.statusCounts.fullyPaid} Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-gray-600">{financials.statusCounts.pending} Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">{financials.overdueCount} Overdue</span>
                    </div>
                  </div>
                  
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <FiFilter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {filterOptions.find(opt => opt.value === statusFilter)?.label || "Filter"}
                      </span>
                      <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showFilterDropdown && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setShowFilterDropdown(false)}
                        />
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/70 z-30 overflow-hidden">
                          <div className="p-2">
                            {filterOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setStatusFilter(option.value);
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm hover:bg-gray-50 transition-all duration-200 rounded-lg ${
                                  statusFilter === option.value 
                                    ? "bg-indigo-50 text-indigo-700 font-medium" 
                                    : "text-gray-700"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {option.icon}
                                  <span>{option.label}</span>
                                </div>
                                {statusFilter === option.value && (
                                  <FiCheckCircle className="w-4 h-4 text-indigo-600 ml-auto" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200/50">
                  <p className="text-sm text-gray-600 mb-2">Total Due (Filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.totalAmount}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200/50">
                  <p className="text-sm text-gray-600 mb-2">Total Fees (Filtered)</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.totalFees}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200/50">
                  <p className="text-sm text-gray-600 mb-2">Showing Installments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredSchedule.length} <span className="text-lg font-normal text-gray-500">/ {schedule.length}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100/30">
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Installment Details
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Due
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Fees Due
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((item) => (
                      <tr 
                        key={item.scheduleId} 
                        className="hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-white transition-all duration-200 group"
                      >
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all">
                              <span className="text-indigo-700 font-bold">{item.installmentNo}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                Installment #{item.installmentNo}
                              </div>
                              <div className="text-xs text-gray-500">ID: {item.scheduleId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatDate(item.dueDate)}</div>
                          <div className="text-xs text-gray-500">Schedule ID: {item.scheduleId}</div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(item.totalDue)}
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-600">
                            {formatCurrency(item.feesDue)}
                          </div>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-16 text-center">
                        <div className="text-gray-400 max-w-md mx-auto">
                          <div className="bg-gradient-to-br from-gray-100 to-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FiFilter className="w-8 h-8" />
                          </div>
                          <p className="text-xl font-semibold text-gray-500 mb-2">No installments found</p>
                          <p className="text-gray-400">Try changing your filter criteria or check back later</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-white to-gray-50/90 backdrop-blur-sm border-t border-gray-200/50 rounded-b-3xl px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            <div className="flex gap-3">
              {/* <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Print Summary
              </button> */}
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <FiX className="w-4 h-4" />
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanDetails;