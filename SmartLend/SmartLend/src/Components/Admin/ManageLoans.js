
// import React, { useState } from "react";
// import { useGetAllLoansQuery } from "../../services/loanApiSlice";
// import {
//   FiDollarSign,
//   FiTrendingUp,
//   FiClock,
//   FiCheckCircle,
//   FiXCircle,
//   FiEye,
//   FiCalendar,
//   FiPercent,
//   FiUser,
//   FiPackage
// } from "react-icons/fi";
// import { TbCurrencyDollar } from "react-icons/tb";
// import { MdPendingActions } from "react-icons/md";

// const ManageLoans = () => {
//   const { data: loans = [], isLoading, isError } = useGetAllLoansQuery();
//   const [filter, setFilter] = useState("all");

//   // Filter loans based on status
//   const filteredLoans = loans.filter(loan => {
//     if (filter === "all") return true;
//     return loan.status?.toLowerCase() === filter.toLowerCase();
//   });

//   // Calculate statistics
//   const totalLoans = loans.length;
//   const totalPrincipal = loans.reduce((sum, loan) => sum + (loan.principalAmount || 0), 0);
//   const pendingLoans = loans.filter(loan => loan.status?.toLowerCase() === "pending").length;
//   const approvedLoans = loans.filter(loan => loan.status?.toLowerCase() === "approved").length;
//   const totalPayable = loans.reduce((sum, loan) => sum + (loan.totalPayable || 0), 0);
//   const avgInterestRate = loans.length > 0 
//     ? loans.reduce((sum, loan) => sum + (loan.interestRate || 0), 0) / loans.length 
//     : 0;

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

//   // Get status badge style
//   const getStatusStyle = (status) => {
//     const statusLower = status?.toLowerCase() || 'pending';
//     const styles = {
//       approved: "bg-green-100 text-green-800 border-green-200",
//       pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       rejected: "bg-red-100 text-red-800 border-red-200",
//       active: "bg-blue-100 text-blue-800 border-blue-200",
//       completed: "bg-gray-100 text-gray-800 border-gray-200"
//     };
//     return styles[statusLower] || styles.pending;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading loan data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
//         <div className="text-center text-red-600">
//           <FiXCircle className="text-4xl mx-auto mb-4" />
//           <p>Error loading loan data. Please try again.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Management Dashboard</h1>
//         <p className="text-gray-600">Track and manage all borrower loans in one place</p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Loans Card */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Loans</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{totalLoans}</p>
//               <div className="flex items-center mt-2">
//                 <FiPackage className="text-blue-500 mr-2" />
//                 <span className="text-sm text-gray-500">All time</span>
//               </div>
//             </div>
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <TbCurrencyDollar className="text-2xl text-blue-600" />
//             </div>
//           </div>
//         </div>

//         {/* Total Principal Card */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Principal</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPrincipal)}</p>
//               <div className="flex items-center mt-2">
//                 <FiDollarSign className="text-green-500 mr-2" />
//                 <span className="text-sm text-gray-500">Amount lent</span>
//               </div>
//             </div>
//             <div className="bg-green-50 p-3 rounded-lg">
//               <FiTrendingUp className="text-2xl text-green-600" />
//             </div>
//           </div>
//         </div>

//         {/* Pending Loans Card */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Pending Loans</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{pendingLoans}</p>
//               <div className="flex items-center mt-2">
//                 <FiClock className="text-yellow-500 mr-2" />
//                 <span className="text-sm text-gray-500">Awaiting review</span>
//               </div>
//             </div>
//             <div className="bg-yellow-50 p-3 rounded-lg">
//               <MdPendingActions className="text-2xl text-yellow-600" />
//             </div>
//           </div>
//         </div>

//         {/* Average Interest Rate Card */}
//         <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Avg. Interest Rate</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{avgInterestRate.toFixed(2)}%</p>
//               <div className="flex items-center mt-2">
//                 <FiPercent className="text-purple-500 mr-2" />
//                 <span className="text-sm text-gray-500">Weighted average</span>
//               </div>
//             </div>
//             <div className="bg-purple-50 p-3 rounded-lg">
//               <FiPercent className="text-2xl text-purple-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div className="mb-6">
//         <div className="flex flex-wrap gap-2 mb-4">
//           {["all", "pending", "approved", "rejected", "active", "completed"].map((status) => (
//             <button
//               key={status}
//               onClick={() => setFilter(status)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 filter === status
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
//               }`}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)} Loans
//             </button>
//           ))}
//         </div>
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-900">
//             {filter === "all" ? "All Loans" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Loans`}
//             <span className="ml-2 text-sm font-normal text-gray-500">
//               ({filteredLoans.length} {filteredLoans.length === 1 ? 'loan' : 'loans'})
//             </span>
//           </h2>
//           <div className="text-sm text-gray-500">
//             Showing {filteredLoans.length} of {totalLoans} total loans
//           </div>
//         </div>
//       </div>

//       {/* Loans Grid */}
//       <div className="space-y-6">
//         {filteredLoans.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
//             <FiEye className="text-4xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
//             <p className="text-gray-500">
//               {filter === "all" 
//                 ? "There are no loans in the system yet." 
//                 : `No ${filter} loans found.`}
//             </p>
//           </div>
//         ) : (
//           filteredLoans.map((loan) => (
//             <div
//               key={loan.loanId || loan.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
//             >
//               <div className="p-6">
//                 {/* Loan Header */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(loan.status)}`}>
//                         {loan.status || "Pending"}
//                       </div>
//                       <span className="ml-3 text-sm text-gray-500">ID: {loan.loanId || loan.id}</span>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900">{loan.loanProductName || "Personal Loan"}</h3>
//                     <div className="flex items-center mt-2 text-gray-600">
//                       <FiUser className="mr-2" />
//                       <span>{loan.borrowerName || "N/A"}</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col md:flex-row gap-6">
//                     <div className="mt-4 md:mt-0">
//                       <div className="text-2xl font-bold text-red-700">
//                         {formatCurrency(loan.totalPayable /12 )}
//                       </div>
//                       <p className="text-sm text-gray-500 text-right">Monthly Amount</p>
//                     </div>
//                     <div className="mt-4 md:mt-0">
//                       <div className="text-2xl font-bold text-blue-700">
//                         {formatCurrency(loan.totalPayable || loan.principalAmount)}
//                       </div>
//                       <p className="text-sm text-gray-500 text-right">Total Payable</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Loan Details Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <FiDollarSign className="mr-2" />
//                       <span className="text-sm">Principal Amount</span>
//                     </div>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {formatCurrency(loan.principalAmount)}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <FiPercent className="mr-2" />
//                       <span className="text-sm">Interest Rate</span>
//                     </div>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {loan.interestRate ? `${loan.interestRate}%` : "N/A"}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <FiCalendar className="mr-2" />
//                       <span className="text-sm">Term</span>
//                     </div>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {loan.termMonths ? `${loan.termMonths} months` : "N/A"}
//                     </p>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex items-center text-gray-600">
//                       <FiCalendar className="mr-2" />
//                       <span className="text-sm">Start Date</span>
//                     </div>
//                     <p className="text-lg font-semibold text-gray-900">
//                       {formatDate(loan.startDate)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
//                     <FiEye className="mr-2" />
//                     View Details
//                   </button>
//                   {loan.status?.toLowerCase() === "pending" && (
//                     <>
//                       <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
//                         <FiCheckCircle className="mr-2" />
//                         Approve Loan
//                       </button>
//                       <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center">
//                         <FiXCircle className="mr-2" />
//                         Reject Loan
//                       </button>
//                     </>
//                   )}
//                   <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors ml-auto">
//                     Generate Statement
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Summary Footer */}
//       {filteredLoans.length > 0 && (
//         <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-gray-900">Portfolio Summary</h3>
//               <p className="text-sm text-gray-600 mt-1">
//                 {filter === "all" ? "All loans" : `${filter} loans`} • {formatCurrency(totalPayable)} total payable
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <div className="flex items-center space-x-6">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-900">{approvedLoans}</div>
//                   <div className="text-sm text-gray-600">Approved</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-900">{pendingLoans}</div>
//                   <div className="text-sm text-gray-600">Pending</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-900">
//                     {formatCurrency(totalPrincipal)}
//                   </div>
//                   <div className="text-sm text-gray-600">Active Principal</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageLoans;


import React, { useState } from "react";
import { useGetAllLoansQuery } from "../../services/loanApiSlice";
import {
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiCalendar,
  FiPercent,
  FiUser,
  FiPackage
} from "react-icons/fi";
import { TbCurrencyDollar } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import ViewLoanDetails from "./ViewLoanDetails"; // Adjust path as needed

const ManageLoans = () => {
  const { data: loans = [], isLoading, isError } = useGetAllLoansQuery();
  const [filter, setFilter] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Filter loans based on status
  const filteredLoans = loans.filter(loan => {
    if (filter === "all") return true;
    return loan.status?.toLowerCase() === filter.toLowerCase();
  });

  // Calculate statistics
  const totalLoans = loans.length;
  const totalPrincipal = loans.reduce((sum, loan) => sum + (loan.principalAmount || 0), 0);
  const pendingLoans = loans.filter(loan => loan.status?.toLowerCase() === "pending").length;
  const approvedLoans = loans.filter(loan => loan.status?.toLowerCase() === "approved").length;
  const totalPayable = loans.reduce((sum, loan) => sum + (loan.totalPayable || 0), 0);
  const avgInterestRate = loans.length > 0 
    ? loans.reduce((sum, loan) => sum + (loan.interestRate || 0), 0) / loans.length 
    : 0;

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

  // Get status badge style
  const getStatusStyle = (status) => {
    const statusLower = status?.toLowerCase() || 'pending';
    const styles = {
      approved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      active: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return styles[statusLower] || styles.pending;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading loan data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <FiXCircle className="text-4xl mx-auto mb-4" />
          <p>Error loading loan data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Management Dashboard</h1>
        <p className="text-gray-600">Track and manage all borrower loans in one place</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Loans Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Loans</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalLoans}</p>
              <div className="flex items-center mt-2">
                <FiPackage className="text-blue-500 mr-2" />
                <span className="text-sm text-gray-500">All time</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <TbCurrencyDollar className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Principal Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Principal</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalPrincipal)}</p>
              <div className="flex items-center mt-2">
                <FiDollarSign className="text-green-500 mr-2" />
                <span className="text-sm text-gray-500">Amount lent</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FiTrendingUp className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        {/* Pending Loans Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Loans</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingLoans}</p>
              <div className="flex items-center mt-2">
                <FiClock className="text-yellow-500 mr-2" />
                <span className="text-sm text-gray-500">Awaiting review</span>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <MdPendingActions className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Average Interest Rate Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Interest Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgInterestRate.toFixed(2)}%</p>
              <div className="flex items-center mt-2">
                <FiPercent className="text-purple-500 mr-2" />
                <span className="text-sm text-gray-500">Weighted average</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FiPercent className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "pending", "approved", "rejected", "active", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} Loans
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {filter === "all" ? "All Loans" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Loans`}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredLoans.length} {filteredLoans.length === 1 ? 'loan' : 'loans'})
            </span>
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredLoans.length} of {totalLoans} total loans
          </div>
        </div>
      </div>

      {/* Loans Grid */}
      <div className="space-y-6">
        {filteredLoans.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <FiEye className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No loans found</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "There are no loans in the system yet." 
                : `No ${filter} loans found.`}
            </p>
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <div
              key={loan.loanId || loan.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="p-6">
                {/* Loan Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(loan.status)}`}>
                        {loan.status || "Pending"}
                      </div>
                      <span className="ml-3 text-sm text-gray-500">ID: {loan.loanId || loan.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{loan.loanProductName || "Personal Loan"}</h3>
                    <div className="flex items-center mt-2 text-gray-600">
                      <FiUser className="mr-2" />
                      <span>{loan.borrowerName || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-red-700">
                        {formatCurrency(loan.totalPayable /12 )}
                      </div>
                      <p className="text-sm text-gray-500 text-right">Monthly Amount</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-blue-700">
                        {formatCurrency(loan.totalPayable || loan.principalAmount)}
                      </div>
                      <p className="text-sm text-gray-500 text-right">Total Payable</p>
                    </div>
                  </div>
                </div>

                {/* Loan Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiDollarSign className="mr-2" />
                      <span className="text-sm">Principal Amount</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(loan.principalAmount)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiPercent className="mr-2" />
                      <span className="text-sm">Interest Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {loan.interestRate ? `${loan.interestRate}%` : "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2" />
                      <span className="text-sm">Term</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {loan.termMonths ? `${loan.termMonths} months` : "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2" />
                      <span className="text-sm">Start Date</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(loan.startDate)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setSelectedLoan(loan)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <FiEye className="mr-2" />
                    View Details
                  </button>
                  {loan.status?.toLowerCase() === "pending" && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                        <FiCheckCircle className="mr-2" />
                        Approve Loan
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center">
                        <FiXCircle className="mr-2" />
                        Reject Loan
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors ml-auto">
                    Generate Statement
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      {filteredLoans.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Portfolio Summary</h3>
              <p className="text-sm text-gray-600 mt-1">
                {filter === "all" ? "All loans" : `${filter} loans`} • {formatCurrency(totalPayable)} total payable
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{approvedLoans}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{pendingLoans}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalPrincipal)}
                  </div>
                  <div className="text-sm text-gray-600">Active Principal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedLoan && (
        <ViewLoanDetails 
          loan={selectedLoan} 
          onClose={() => setSelectedLoan(null)} 
        />
      )}
    </div>
  );
};

export default ManageLoans;