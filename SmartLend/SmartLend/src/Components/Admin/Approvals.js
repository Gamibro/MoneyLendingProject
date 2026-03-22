// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFileAlt,
//   faUser,
//   faPhone,
//   faCreditCard,
//   faDollarSign,
//   faCalendar,
//   faCheckCircle,
//   faTimesCircle,
//   faClock,
//   faPencil,
//   faCheck,
//   faTimes,
//   faSearch,
//   faFilter,
// } from '@fortawesome/free-solid-svg-icons';
// import { useGetAllLoanApplicationsQuery, useChangeLoanApplicationStatusMutation, useSendMessageMutation } from '../../services/loanApplicationApiSlice';
// import RejectionMessageForm from './RejectionMessageForm';

// const Approvals = () => {
//   const [loanApplications, setLoanApplications] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editingStatus, setEditingStatus] = useState(null);
//   const [showRejectionForm, setShowRejectionForm] = useState(false);
//   const [rejectionApplication, setRejectionApplication] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   const { data: apiLoanApplications = [], isLoading, error } = useGetAllLoanApplicationsQuery();
//   const [changeLoanApplicationStatus, { isLoading: isChangingStatus }] = useChangeLoanApplicationStatusMutation();
//   const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

//   useEffect(() => {
//     if (apiLoanApplications && apiLoanApplications.length > 0) {
//       setLoanApplications(apiLoanApplications);
//     }
//   }, [apiLoanApplications]);

//   // Count statuses
//   const pendingCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'pending').length;
//   const acceptedCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'accepted').length;
//   const rejectedCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'rejected').length;

//   // Filter applications by status and search term
//   const filteredApplications = loanApplications.filter((app) => {
//     // Status filter
//     const statusMatches =
//       statusFilter === 'All' ||
//       app.status?.toLowerCase() === statusFilter.toLowerCase();

//     // Search filter - search by Application ID, Borrower Name, or Loan Product Name
//     const searchMatches =
//       searchTerm === '' ||
//       app.loanApplicationId?.toString().includes(searchTerm) ||
//       app.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.loanProductName?.toLowerCase().includes(searchTerm.toLowerCase());

//     return statusMatches && searchMatches;
//   });

//   const handleEditClick = (application) => {
//     setEditingId(application.applicationId);
//     setEditingStatus(application.status);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditingStatus(null);
//   };

//   const handleUpdate = async () => {
//     if (!editingStatus || editingStatus === '') return;

//     // If rejecting, show rejection form first
//     if (editingStatus.toLowerCase() === 'rejected') {
//       setRejectionApplication({
//         ...loanApplications.find((app) => app.applicationId === editingId),
//       });
//       setShowRejectionForm(true);
//       return;
//     }


//     if (editingStatus.toLowerCase() === 'pending') {
//        try {
//         // Update application status
//         const response = await changeLoanApplicationStatus({
//           applicationId: editingId,
//           status: editingStatus,
//         }).unwrap();

  
//         alert('Application updated successfully!');
//         setEditingId(null);
//         setEditingStatus(null);
//       } catch (err) {
//         console.error('Failed to update application:', err);
//         alert('Failed to update application. Please try again.');
//       }
//     }

//     // If accepting, proceed directly
//     if (editingStatus.toLowerCase() === 'accepted') {
//       try {
//         // Update application status
//         const response = await changeLoanApplicationStatus({
//           applicationId: editingId,
//           status: editingStatus,
//         }).unwrap();

//         // Send message to borrower
//         const application = loanApplications.find((app) => app.applicationId === editingId);
//         await sendMessage({
//           phone: application.phone,
//           message: `Hello ${application.borrowerName}, your loan application of Id ${application.applicationId} related to the loan product ${application.loanProductName} has been approved.`,
//         }).unwrap();

//         alert('Application approved and borrower notified!');
//         setEditingId(null);
//         setEditingStatus(null);
//       } catch (err) {
//         console.error('Failed to update application:', err);
//         alert('Failed to update application. Please try again.');
//       }
//     }
//   };

//   const handleRejectionSubmit = async (reason) => {
//     try {
//       // Create rejection message
//       const message = `Hello ${rejectionApplication.borrowerName}, your loan application of Id ${rejectionApplication.applicationId},that you have requested for the loan product ${rejectionApplication.loanProductName} is rejected. Reason for Rejection: ${reason}`;

//       // Update application status to rejected
//       await changeLoanApplicationStatus({
//         applicationId: editingId,
//         status: 'Rejected',
//       }).unwrap();

//       // Send rejection message to borrower
//       await sendMessage({
//         phone: rejectionApplication.phone,
//         message: message,
//       }).unwrap();

//       alert('Application rejected and borrower notified!');
//       setShowRejectionForm(false);
//       setRejectionApplication(null);
//       setEditingId(null);
//       setEditingStatus(null);
//     } catch (err) {
//       console.error('Failed to reject application:', err);
//       alert('Failed to reject application. Please try again.');
//     }
//   };

//   const getStatusColor = (status) => {
//     const lowerStatus = status?.toLowerCase();
//     switch (lowerStatus) {
//       case 'accepted':
//         return 'bg-green-500/20 text-green-300 border-green-500/40';
//       case 'rejected':
//         return 'bg-red-500/20 text-red-300 border-red-500/40';
//       case 'pending':
//         return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
//       default:
//         return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
//     }
//   };

//   const getStatusIcon = (status) => {
//     const lowerStatus = status?.toLowerCase();
//     switch (lowerStatus) {
//       case 'accepted':
//         return faCheckCircle;
//       case 'rejected':
//         return faTimesCircle;
//       case 'pending':
//         return faClock;
//       default:
//         return faFileAlt;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
//         <div className="text-white text-lg">Loading loan applications...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md text-white">
//           <h2 className="text-lg font-bold mb-2">Error Loading Applications</h2>
//           <p className="text-sm">
//             {error?.data?.message || 'Failed to load loan applications. Please try again later.'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header Section */}
//         <div className="mb-12">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
//               <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-white" />
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Loan Approvals</h1>
//           </div>
//           <p className="text-blue-200 text-lg ml-16">Review and manage borrower loan applications</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {/* Total Applications */}
//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-blue-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-blue-300 text-sm font-bold uppercase tracking-widest">Total</p>
//                 <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition">
//                   <FontAwesomeIcon icon={faFileAlt} className="text-2xl text-blue-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{loanApplications.length}</p>
//               <p className="text-blue-200 text-sm">Total applications</p>
//             </div>
//           </div>

//           {/* Pending Applications */}
//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-amber-400 shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-amber-300 text-sm font-bold uppercase tracking-widest">Pending</p>
//                 <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/40 transition">
//                   <FontAwesomeIcon icon={faClock} className="text-2xl text-amber-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{pendingCount}</p>
//               <p className="text-amber-200 text-sm">Awaiting review</p>
//             </div>
//           </div>

//           {/* Accepted Applications */}
//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-green-400 shadow-lg hover:shadow-green-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-green-300 text-sm font-bold uppercase tracking-widest">Accepted</p>
//                 <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/40 transition">
//                   <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{acceptedCount}</p>
//               <p className="text-green-200 text-sm">Approved applications</p>
//             </div>
//           </div>

//           {/* Rejected Applications */}
//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-red-400 shadow-lg hover:shadow-red-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-red-300 text-sm font-bold uppercase tracking-widest">Rejected</p>
//                 <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/40 transition">
//                   <FontAwesomeIcon icon={faTimesCircle} className="text-2xl text-red-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{rejectedCount}</p>
//               <p className="text-red-200 text-sm">Declined applications</p>
//             </div>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-2xl overflow-hidden">
//           {/* Search and Filter Section */}
//           <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 border-b border-slate-600">
//             <div className="flex flex-col gap-4">
//               {/* Search Bar */}
//               <div className="flex items-center gap-3">
//                 <FontAwesomeIcon icon={faSearch} className="text-blue-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by Application ID, Borrower Name, or Loan Product..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                 />
//               </div>

//               {/* Status Filter Buttons */}
//               <div className="flex items-center gap-3 flex-wrap">
//                 <FontAwesomeIcon icon={faFilter} className="text-blue-400" />
//                 <div className="flex gap-2 flex-wrap">
//                   {['All', 'Pending', 'Accepted', 'Rejected'].map((status) => (
//                     <button
//                       key={status}
//                       onClick={() => setStatusFilter(status)}
//                       className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
//                         statusFilter === status
//                           ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
//                           : 'bg-slate-700 text-slate-300 border border-slate-600 hover:border-slate-500'
//                       }`}
//                     >
//                       {status === 'All' ? 'All Status' : status}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Results Summary */}
//               <div className="text-sm text-blue-300">
//                 Showing <span className="font-bold text-blue-100">{filteredApplications.length}</span> of{' '}
//                 <span className="font-bold text-slate-300">{loanApplications.length}</span> applications
//               </div>
//             </div>
//           </div>

//           {/* Table Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 border-b border-slate-600">
//             <div className="flex items-center gap-3">
//               <FontAwesomeIcon icon={faFileAlt} className="text-white text-xl" />
//               <h2 className="text-xl font-bold text-white">Loan Applications</h2>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-slate-700/50 border-b border-slate-600">
//                   <th className="px-6 py-4 text-left text-white text-sm font-bold text-blue-300 uppercase tracking-wider">ID</th>
//                   <th className="px-6 py-4 text-left text-white text-sm font-bold text-blue-300 uppercase tracking-wider">Borrower</th>

//                   <th className="px-6 py-4 text-left text-white text-sm font-bold text-blue-300 uppercase tracking-wider">Loan Product</th>
//                   <th className="px-6 py-4 text-left text-sm text-white font-bold text-blue-300 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-4 text-left text-sm font-bold text-white text-blue-300 uppercase tracking-wider">Term</th>
//                   <th className="px-6 py-4 text-center text-sm font-bold text-white text-blue-300 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-center text-sm font-bold text-white text-blue-300 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-600">
//                 {filteredApplications && filteredApplications.length > 0 ? (
//                   filteredApplications.map((application) => (
//                     <tr key={application.apppplicationId} className="hover:bg-slate-700/50 transition-colors duration-200 group">
//                       <td className="px-6 py-5">
//                         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm group-hover:shadow-lg group-hover:shadow-blue-500/30 transition">
//                           {application.applicationId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div>
//                           <p className="text-white font-semibold text-base flex items-center gap-2">
//                             <FontAwesomeIcon icon={faUser} className="text-blue-400 text-sm" />
//                             {application.borrowerName || 'N/A'}
//                           </p>
//                         </div>
//                       </td>
//                       {/* <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faPhone} className="text-green-400 text-sm" />
//                           <span className="text-slate-200">{application.phone || 'N/A'}</span>
//                         </div>
//                       </td> */}
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faCreditCard} className="text-cyan-400 text-sm" />
//                           <span className="text-slate-200 font-medium">{application.loanProductName || 'N/A'}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-sm" />
//                           <span className="text-slate-200 font-semibold">${application.requestedAmount || '0'}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faCalendar} className="text-purple-400 text-sm" />
//                           <span className="text-slate-200">{application.requestedTermMonths || '0'} months</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         {editingId === application.applicationId ? (
//                           <select
//                             value={editingStatus}
//                             onChange={(e) => setEditingStatus(e.target.value)}
//                             disabled={isChangingStatus || isSendingMessage}
//                             className="px-3 py-1.5 rounded-lg bg-slate-600 border border-blue-400 text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
//                           >
//                             <option value="Pending">Pending</option>
//                             <option value="Accepted">Accepted</option>
//                             <option value="Rejected">Rejected</option>
//                           </select>
//                         ) : (
//                           <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs uppercase tracking-wide border transition ${getStatusColor(application.status)}`}>
//                             <FontAwesomeIcon icon={getStatusIcon(application.status)} className="text-sm" />
//                             {application.status || 'Unknown'}
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-6 py-5 text-center">
//                         {editingId === application.applicationId ? (
//                           <div className="flex gap-2 justify-center">
//                             <button
//                               onClick={handleUpdate}
//                               disabled={isChangingStatus || isSendingMessage || !editingStatus}
//                               className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all shadow-lg hover:shadow-green-500/30 disabled:opacity-50"
//                             >
//                               <FontAwesomeIcon icon={faCheck} className="text-xs" />
//                               Update
//                             </button>
//                             <button
//                               onClick={handleCancel}
//                               disabled={isChangingStatus || isSendingMessage}
//                               className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5 transition-all disabled:opacity-50"
//                             >
//                               <FontAwesomeIcon icon={faTimes} className="text-xs" />
//                               Cancel
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => handleEditClick(application)}
//                             className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-slate-700 transition"
//                           >
//                             <FontAwesomeIcon icon={faPencil} className="text-lg" />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-8 text-center">
//                       <p className="text-slate-400 text-sm">No loan applications found</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Table Footer */}
//           <div className="bg-slate-700/50 border-t border-slate-600 px-8 py-4 flex justify-between items-center">
//             <span className="text-blue-200 text-sm font-medium">
//               Showing <span className="text-blue-100 font-bold">{loanApplications.length}</span> application{loanApplications.length !== 1 ? 's' : ''}
//             </span>
//             <span className="text-slate-400 text-sm">Last updated: <span className="text-blue-300">Today</span></span>
//           </div>
//         </div>

//       </div>

//       {/* Rejection Message Form Modal */}
//       {showRejectionForm && rejectionApplication && (
//         <RejectionMessageForm
//           application={rejectionApplication}
//           onSubmit={handleRejectionSubmit}
//           onCancel={() => {
//             setShowRejectionForm(false);
//             setRejectionApplication(null);
//             setEditingId(null);
//             setEditingStatus(null);
//           }}
//           isLoading={isChangingStatus || isSendingMessage}
//         />
//       )}
//     </div>
//   );
// };

// export default Approvals;




import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faUser,
  faPhone,
  faCreditCard,
  faDollarSign,
  faCalendar,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faPencil,
  faCheck,
  faTimes,
  faSearch,
  faFilter,
  faSort,
  faChevronDown,
  faChevronUp,
  faEye,
  faPaperPlane,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useGetAllLoanApplicationsQuery, useChangeLoanApplicationStatusMutation, useSendMessageMutation } from '../../services/loanApplicationApiSlice';
import RejectionMessageForm from './RejectionMessageForm';

const Approvals = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [rejectionApplication, setRejectionApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'applicationId', direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);

  const { data: apiLoanApplications = [], isLoading, error } = useGetAllLoanApplicationsQuery();
  const [changeLoanApplicationStatus, { isLoading: isChangingStatus }] = useChangeLoanApplicationStatusMutation();
  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (apiLoanApplications && apiLoanApplications.length > 0) {
      setLoanApplications(apiLoanApplications);
    }
  }, [apiLoanApplications]);

  // Count statuses
  const pendingCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'pending').length;
  const acceptedCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'accepted').length;
  const rejectedCount = loanApplications.filter((app) => app.status?.toLowerCase() === 'rejected').length;

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort applications
  const sortedApplications = [...loanApplications].sort((a, b) => {
    if (sortConfig.key === 'applicationId' || sortConfig.key === 'requestedAmount' || sortConfig.key === 'requestedTermMonths') {
      return sortConfig.direction === 'asc' 
        ? (a[sortConfig.key] || 0) - (b[sortConfig.key] || 0)
        : (b[sortConfig.key] || 0) - (a[sortConfig.key] || 0);
    }
    
    if (sortConfig.key === 'borrowerName' || sortConfig.key === 'loanProductName' || sortConfig.key === 'status') {
      const aValue = (a[sortConfig.key] || '').toLowerCase();
      const bValue = (b[sortConfig.key] || '').toLowerCase();
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
    
    return 0;
  });

  // Filter applications by status and search term
  const filteredApplications = sortedApplications.filter((app) => {
    // Status filter
    const statusMatches =
      statusFilter === 'All' ||
      app.status?.toLowerCase() === statusFilter.toLowerCase();

    // Search filter
    const searchMatches =
      searchTerm === '' ||
      app.loanApplicationId?.toString().includes(searchTerm) ||
      app.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.loanProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm);

    return statusMatches && searchMatches;
  });

  const handleEditClick = (application) => {
    setEditingId(application.applicationId);
    setEditingStatus(application.status);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingStatus(null);
  };

  const handleUpdate = async () => {
    if (!editingStatus || editingStatus === '') return;

    // If rejecting, show rejection form first
    if (editingStatus.toLowerCase() === 'rejected') {
      setRejectionApplication({
        ...loanApplications.find((app) => app.applicationId === editingId),
      });
      setShowRejectionForm(true);
      return;
    }

    if (editingStatus.toLowerCase() === 'pending') {
      try {
        const response = await changeLoanApplicationStatus({
          applicationId: editingId,
          status: editingStatus,
        }).unwrap();

        alert('Application updated successfully!');
        setEditingId(null);
        setEditingStatus(null);
      } catch (err) {
        console.error('Failed to update application:', err);
        alert('Failed to update application. Please try again.');
      }
    }

    // If accepting, proceed directly
    if (editingStatus.toLowerCase() === 'accepted') {
      try {
        const response = await changeLoanApplicationStatus({
          applicationId: editingId,
          status: editingStatus,
        }).unwrap();

        const application = loanApplications.find((app) => app.applicationId === editingId);
        await sendMessage({
          phone: application.phone,
          message: `Hello ${application.borrowerName}, your loan application of Id ${application.applicationId} related to the loan product ${application.loanProductName} has been approved.`,
        }).unwrap();

        alert('Application approved and borrower notified!');
        setEditingId(null);
        setEditingStatus(null);
      } catch (err) {
        console.error('Failed to update application:', err);
        alert('Failed to update application. Please try again.');
      }
    }
  };

  const handleRejectionSubmit = async (reason) => {
    try {
      const message = `Hello ${rejectionApplication.borrowerName}, your loan application of Id ${rejectionApplication.applicationId},that you have requested for the loan product ${rejectionApplication.loanProductName} is rejected. Reason for Rejection: ${reason}`;

      await changeLoanApplicationStatus({
        applicationId: editingId,
        status: 'Rejected',
      }).unwrap();

      await sendMessage({
        phone: rejectionApplication.phone,
        message: message,
      }).unwrap();

      alert('Application rejected and borrower notified!');
      setShowRejectionForm(false);
      setRejectionApplication(null);
      setEditingId(null);
      setEditingStatus(null);
    } catch (err) {
      console.error('Failed to reject application:', err);
      alert('Failed to reject application. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    const lowerStatus = status?.toLowerCase();
    switch (lowerStatus) {
      case 'accepted':
        return faCheckCircle;
      case 'rejected':
        return faTimesCircle;
      case 'pending':
        return faClock;
      default:
        return faFileAlt;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-gray-600 text-lg">Loading loan applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border border-red-100">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Applications</h2>
          <p className="text-sm text-gray-600">
            {error?.data?.message || 'Failed to load loan applications. Please try again later.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <FontAwesomeIcon icon={faChartLine} className="text-xl text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Loan Approvals Dashboard</h1>
              </div>
              <p className="text-gray-600 ml-10">Review and manage borrower loan applications efficiently</p>
            </div>
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
              Total: <span className="font-semibold text-gray-800">{loanApplications.length}</span> applications
            </div>
          </div>

          {/* Stats Cards - Modern Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Applications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{loanApplications.length}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FontAwesomeIcon icon={faFileAlt} className="text-xl text-blue-600" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">All time records</div>
              </div>
            </div>

            {/* Pending Applications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <FontAwesomeIcon icon={faClock} className="text-xl text-amber-600" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">Awaiting decision</div>
              </div>
            </div>

            {/* Accepted Applications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Approved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{acceptedCount}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">Successfully approved</div>
              </div>
            </div>

            {/* Rejected Applications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Declined</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{rejectedCount}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-xl text-red-600" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">Applications rejected</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, product, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
                  <span className="text-sm text-gray-700 font-medium">Filter by:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending', 'Accepted', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === status
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'All' ? 'All Status' : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredApplications.length}</span> of{' '}
                <span className="font-semibold text-gray-700">{loanApplications.length}</span> applications
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Loan Applications</h2>
                </div>
                <div className="text-sm text-gray-500">
                  <FontAwesomeIcon icon={faSort} className="mr-2" />
                  Click headers to sort
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('applicationId')}
                    >
                      <div className="flex items-center gap-2">
                        ID
                        {sortConfig.key === 'applicationId' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('borrowerName')}
                    >
                      <div className="flex items-center gap-2">
                        Borrower
                        {sortConfig.key === 'borrowerName' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('loanProductName')}
                    >
                      <div className="flex items-center gap-2">
                        Loan Product
                        {sortConfig.key === 'loanProductName' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('requestedAmount')}
                    >
                      <div className="flex items-center gap-2">
                        Amount
                        {sortConfig.key === 'requestedAmount' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('requestedTermMonths')}
                    >
                      <div className="flex items-center gap-2">
                        Term
                        {sortConfig.key === 'requestedTermMonths' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        {sortConfig.key === 'status' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faChevronUp : faChevronDown} className="text-xs" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications && filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <React.Fragment key={application.applicationId}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-sm">
                              #{application.applicationId}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-gray-900 font-medium flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-sm" />
                                {application.borrowerName || 'N/A'}
                              </p>
                              {application.phone && (
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                  <FontAwesomeIcon icon={faPhone} className="text-xs" />
                                  {application.phone}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faCreditCard} className="text-gray-400 text-sm" />
                              <span className="text-gray-700 font-medium">{application.loanProductName || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faDollarSign} className="text-gray-400 text-sm" />
                              <span className="text-gray-900 font-semibold">${application.requestedAmount?.toLocaleString() || '0'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faCalendar} className="text-gray-400 text-sm" />
                              <span className="text-gray-700">{application.requestedTermMonths || '0'} months</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {editingId === application.applicationId ? (
                              <select
                                value={editingStatus}
                                onChange={(e) => setEditingStatus(e.target.value)}
                                disabled={isChangingStatus || isSendingMessage}
                                className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            ) : (
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-xs border ${getStatusColor(application.status)}`}>
                                <FontAwesomeIcon icon={getStatusIcon(application.status)} className="text-sm" />
                                {application.status || 'Unknown'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {editingId === application.applicationId ? (
                                <>
                                  <button
                                    onClick={handleUpdate}
                                    disabled={isChangingStatus || isSendingMessage || !editingStatus}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                  >
                                    <FontAwesomeIcon icon={faCheck} className="text-xs" />
                                    Update
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    disabled={isChangingStatus || isSendingMessage}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-50 transition-colors flex items-center gap-2"
                                  >
                                    <FontAwesomeIcon icon={faTimes} className="text-xs" />
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditClick(application)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit Status"
                                  >
                                    <FontAwesomeIcon icon={faPencil} className="text-sm" />
                                  </button>
                                  <button
                                    onClick={() => setExpandedRow(expandedRow === application.applicationId ? null : application.applicationId)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="View Details"
                                  >
                                    <FontAwesomeIcon icon={expandedRow === application.applicationId ? faChevronUp : faEye} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded Row Details */}
                        {expandedRow === application.applicationId && (
                          <tr>
                            <td colSpan="7" className="px-6 py-4 bg-blue-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Application Details</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Application ID:</span>
                                      <span className="font-medium">#{application.applicationId}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Submitted Date:</span>
                                      <span className="font-medium">
                                        {application.submittedDate || new Date().toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Loan Purpose:</span>
                                      <span className="font-medium">{application.loanPurpose || 'Not specified'}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                      <span className="text-gray-700">{application.borrowerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                      <span className="text-gray-700">{application.phone || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <FontAwesomeIcon icon={faPaperPlane} className="text-gray-400" />
                                      <span className="text-gray-700">{application.email || 'Not provided'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FontAwesomeIcon icon={faFileAlt} className="text-4xl mb-4" />
                          <p className="text-lg font-medium text-gray-500 mb-2">No applications found</p>
                          <p className="text-sm text-gray-400">
                            {searchTerm ? 'Try adjusting your search terms' : 'No loan applications available'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredApplications.length}</span> of{' '}
                  <span className="font-semibold">{loanApplications.length}</span> applications
                </div>
                <div className="text-xs text-gray-500">
                  Data refreshes automatically • Click on table headers to sort
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Message Form Modal */}
      {showRejectionForm && rejectionApplication && (
        <RejectionMessageForm
          application={rejectionApplication}
          onSubmit={handleRejectionSubmit}
          onCancel={() => {
            setShowRejectionForm(false);
            setRejectionApplication(null);
            setEditingId(null);
            setEditingStatus(null);
          }}
          isLoading={isChangingStatus || isSendingMessage}
        />
      )}
    </div>
  );
};

export default Approvals;

