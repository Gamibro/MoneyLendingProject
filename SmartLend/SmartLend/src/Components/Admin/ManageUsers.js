// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUsers,
//   faUser,
//   faEye,
//   faCheckCircle,
//   faTimesCircle,
//   faTimes,
//   faCheck,
// } from '@fortawesome/free-solid-svg-icons';
// import { useGetAllBorrowersQuery, useUpdateBorrowerUserMutation, useUpdateUserMutation } from '../../services/borrowerUserApiSlice';

// const ManageUsers = () => {
//   const [borrowers, setBorrowers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editMode, setEditMode] = useState('view');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   // Queries and Mutations
//   const { data: borrowerData, isLoading, error,refetch } = useGetAllBorrowersQuery();
//   const [updateBorrowerUser, { isLoading: isUpdatingBorrower }] = useUpdateBorrowerUserMutation();
//   const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

//   useEffect(() => {
//     if (borrowerData && Array.isArray(borrowerData)) {
//       setBorrowers(borrowerData);
//     }
//   }, [borrowerData]);

//   // Borrower counts and filtered list
//   const totalBorrowers = borrowers.length;
//   const activeBorrowersCount = borrowers.filter((b) => (b.status || '').toLowerCase() === 'active').length;
//   const inactiveBorrowersCount = borrowers.filter((b) => (b.status || '').toLowerCase() === 'inactive').length;

//   const filteredBorrowers = borrowers.filter((borrower) => {
//     const term = searchTerm || '';
//     const matchesSearch =
//       term === '' ||
//       borrower.borrowerId?.toString().includes(term) ||
//       borrower.firstName?.toLowerCase().includes(term.toLowerCase()) ||
//       borrower.lastName?.toLowerCase().includes(term.toLowerCase()) ||
//       borrower.userName?.toLowerCase().includes(term.toLowerCase()) ||
//       borrower.email?.toLowerCase().includes(term.toLowerCase()) ||
//       borrower.phone?.includes(term);

//     const status = (borrower.status || '').toLowerCase();
//     const matchesStatus = statusFilter === 'All' ? true : status === statusFilter.toLowerCase();

//     return matchesSearch && matchesStatus;
//   });

//   // Handle saving borrower details (firstName, lastName, nic, address, dob, occupation)
//   const handleSaveBorrowerDetails = async () => {
//     if (!selectedUser) return;
//     try {
//       const payload = {
//         borrowerId: selectedUser.borrowerId,
//         firstName: selectedUser.firstName,
//         lastName: selectedUser.lastName,
//         nic: selectedUser.nic,
//         address: selectedUser.address,
//         dob: selectedUser.dob,
//         occupation: selectedUser.occupation,
//       };
//       await updateBorrowerUser(payload).unwrap();
//       alert('Borrower details updated successfully!');
//       setEditMode('view');
//     } catch (err) {
//       console.error('Failed to update borrower details:', err);
//       alert('Failed to update borrower details.');
//     }
//   };

//   // Handle saving user details (userName, email, phone, status)
//   const handleSaveUserDetails = async () => {
//     if (!selectedUser) return;
//     try {
//       const payload = {
//         userId: selectedUser.borrowerId,
//         userName: selectedUser.userName,
//         email: selectedUser.email,
//         phone: selectedUser.phone,
//         status: selectedUser.status,
//       };
//       await updateUser(payload).unwrap();
//       refetch();
//       alert('User details updated successfully!');
//       setEditMode('view');
//     } catch (err) {
//       console.error('Failed to update user details:', err);
//       alert('Failed to update user details.');
//     }
//   };

//   // Handle save based on edit mode
//   const handleSave = async () => {
//     if (editMode === 'borrower') {
//       await handleSaveBorrowerDetails();
//     } else if (editMode === 'user') {
//       await handleSaveUserDetails();
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
//         <div className="text-white text-lg">Loading borrowers...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md text-white">
//           <h2 className="text-lg font-bold mb-2">Error Loading Borrowers</h2>
//           <p className="text-sm">{error?.data?.message || 'Failed to load borrowers.'}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8 pb-4">
//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
//               <FontAwesomeIcon icon={faUser} placeholder='View User' className="text-2xl text-white" />
//             </div>
//             <h1 className="text-4xl sm:text-5xl p-2 font-bold leading-tight bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Manage Borrowers</h1>
//           </div>
//           <p className="text-blue-200 text-sm sm:ml-16 ml-0 mt-2 sm:mt-0">Manage borrower and user information</p>
//         </div>

//         {/* Stats & Filter */}
//         <div className="mb-6 space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
//             <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-blue-200">Total Borrowers</p>
//                 <p className="text-2xl font-bold text-white">{totalBorrowers}</p>
//               </div>
//               <div className="text-blue-400 text-3xl">
//                 <FontAwesomeIcon icon={faUsers} />
//               </div>
//             </div>
//             <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-blue-200">Active Borrowers</p>
//                 <p className="text-2xl font-bold text-white">{activeBorrowersCount}</p>
//               </div>
//               <div className="text-green-400 text-3xl">
//                 <FontAwesomeIcon icon={faCheckCircle} />
//               </div>
//             </div>
//             <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-blue-200">Inactive Borrowers</p>
//                 <p className="text-2xl font-bold text-white">{inactiveBorrowersCount}</p>
//               </div>
//               <div className="text-amber-400 text-3xl">
//                 <FontAwesomeIcon icon={faTimesCircle} />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div className="flex items-center gap-2">
//               {['All','Active','Inactive'].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setStatusFilter(s)}
//                   aria-pressed={statusFilter === s}
//                   className={`px-3 py-2 rounded-md font-semibold text-sm transition ${
//                     statusFilter === s
//                       ? s === 'Active'
//                         ? 'bg-green-500 text-white'
//                         : s === 'Inactive'
//                         ? 'bg-amber-500 text-white'
//                         : 'bg-blue-500 text-white'
//                       : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>

//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Search by ID, Name, Username, Email, or Phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-2xl overflow-hidden">
          
//           {/* Table Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 border-b border-slate-600">
//             <h2 className="text-lg font-bold text-white">Borrower List</h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-slate-700/50 border-b border-slate-600">
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white  uppercase">ID</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">First Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">Last Name</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">Username</th>
//                   <th className="px-4 py-3 text-center text-xs font-bold text-white  uppercase">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase">Status</th>
//                   <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-600">
//                 {filteredBorrowers.length > 0 ? (
//                   filteredBorrowers.map((borrower) => (
//                     <tr key={borrower.borrowerId} className="hover:bg-slate-700/50 transition-colors">
//                       <td className="px-4 py-3 text-white font-medium">{borrower.borrowerId}</td>
//                       <td className="px-4 py-3 text-slate-200">{borrower.firstName || '-'}</td>
//                       <td className="px-4 py-3 text-slate-200">{borrower.lastName || '-'}</td>
//                       <td className="px-4 py-3 text-slate-200">{borrower.userName}</td>
//                       <td className="px-4 py-3 text-slate-200">{borrower.email}</td>
//                       <td className="px-4 py-3 text-slate-200">{borrower.phone}</td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-semibold text-xs uppercase ${
//                           borrower.status?.toLowerCase() === 'active'
//                             ? 'bg-green-500/20 text-green-300 border border-green-500/40'
//                             : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
//                         }`}>
//                           <FontAwesomeIcon icon={borrower.status?.toLowerCase() === 'active' ? faCheckCircle : faTimesCircle} />
//                           {borrower.status || 'Unknown'}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <button
//                           onClick={() => {
//                             setSelectedUser(borrower);
//                             setEditMode('view');
//                           }}
//                           className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-slate-700 transition"
//                         >
//                           <FontAwesomeIcon icon={faEye} className="text-lg" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="px-4 py-8 text-center text-slate-400">
//                       No borrowers found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Table Footer */}
//           <div className="bg-slate-700/50 border-t border-slate-600 px-6 py-3 text-sm text-blue-300">
//             Showing <span className="font-bold">{filteredBorrowers.length}</span> of <span className="font-bold">{borrowers.length}</span> borrowers
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {selectedUser && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-600 overflow-hidden max-h-screen overflow-y-auto">
              
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 border-b border-slate-600 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-white">Edit User Details</h2>
//                 <button
//                   onClick={() => {
//                     setSelectedUser(null);
//                     setEditMode('view');
//                   }}
//                   className="text-white hover:bg-blue-700 p-2 rounded-lg transition"
//                 >
//                   <FontAwesomeIcon icon={faTimes} className="text-lg" />
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6">
//                 {editMode === 'view' && (
//                   <div className="space-y-6">
//                     {/* Borrower Details Section */}
//                     <div>
//                       <h3 className="text-lg font-bold text-blue-300 mb-4">Borrower Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Borrower ID</label>
//                           <p className="text-white font-semibold">{selectedUser.borrowerId}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">NIC</label>
//                           <p className="text-white font-semibold">{selectedUser.nic || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">First Name</label>
//                           <p className="text-white font-semibold">{selectedUser.firstName || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Last Name</label>
//                           <p className="text-white font-semibold">{selectedUser.lastName || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Date of Birth</label>
//                           <p className="text-white font-semibold">{selectedUser.dob || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Occupation</label>
//                           <p className="text-white font-semibold">{selectedUser.occupation || 'N/A'}</p>
//                         </div>
//                         <div className="md:col-span-2">
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Address</label>
//                           <p className="text-white font-semibold">{selectedUser.address || 'N/A'}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setEditMode('borrower')}
//                         className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30"
//                       >
//                         Edit Borrower Details
//                       </button>
//                     </div>

//                     {/* User Details Section */}
//                     <div className="border-t border-slate-600 pt-6">
//                       <h3 className="text-lg font-bold text-blue-300 mb-4">User Account</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                         {/* <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">UserId</label>
//                           <p className="text-white font-semibold">{selectedUser.borrowerId}</p>
//                         </div> */}
                        
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Username</label>
//                           <p className="text-white font-semibold">{selectedUser.userName}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
//                           <p className="text-white font-semibold">{selectedUser.email}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Phone</label>
//                           <p className="text-white font-semibold">{selectedUser.phone}</p>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
//                           <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-semibold text-xs uppercase ${
//                             selectedUser.status?.toLowerCase() === 'active'
//                               ? 'bg-green-500/20 text-green-300'
//                               : 'bg-amber-500/20 text-amber-300'
//                           }`}>
//                             {selectedUser.status}
//                           </span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setEditMode('user')}
//                         className="mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-green-500/30"
//                       >
//                         Edit User Details
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {editMode === 'borrower' && (
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-bold text-blue-300 mb-4">Edit Borrower Information</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">First Name</label>
//                         <input
//                           type="text"
//                           value={selectedUser.firstName || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, firstName: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="First Name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Last Name</label>
//                         <input
//                           type="text"
//                           value={selectedUser.lastName || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, lastName: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Last Name"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">NIC</label>
//                         <input
//                           type="text"
//                           value={selectedUser.nic || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, nic: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="NIC"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Date of Birth</label>
//                         <input
//                           type="date"
//                           value={selectedUser.dob || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, dob: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Occupation</label>
//                         <input
//                           type="text"
//                           value={selectedUser.occupation || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, occupation: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Occupation"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Address</label>
//                         <input
//                           type="text"
//                           value={selectedUser.address || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, address: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Address"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {editMode === 'user' && (
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-bold text-blue-300 mb-4">Edit User Account</h3>
                    
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Username</label>
//                         <input
//                           type="text"
//                           value={selectedUser.userName || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, userName: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Username"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Email</label>
//                         <input
//                           type="email"
//                           value={selectedUser.email || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, email: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Email"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Phone</label>
//                         <input
//                           type="tel"
//                           value={selectedUser.phone || ''}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, phone: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                           placeholder="Phone"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-bold text-blue-300 mb-2">Status</label>
//                         <select
//                           value={selectedUser.status || 'Active'}
//                           onChange={(e) =>
//                             setSelectedUser({ ...selectedUser, status: e.target.value })
//                           }
//                           className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition"
//                         >
//                           <option value="Active">Active</option>
//                           <option value="Inactive">Inactive</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="bg-slate-700/50 border-t border-slate-600 px-6 py-4 flex gap-3 justify-end">
//                 <button
//                   onClick={() => {
//                     setSelectedUser(null);
//                     setEditMode('view');
//                   }}
//                   className="px-4 py-2 rounded-lg font-bold text-slate-200 border border-slate-500 hover:bg-slate-600 transition"
//                 >
//                   Close
//                 </button>
//                 {editMode !== 'view' && (
//                   <>
//                     <button
//                       onClick={() => setEditMode('view')}
//                       className="px-4 py-2 rounded-lg font-bold text-slate-200 border border-slate-500 hover:bg-slate-600 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       disabled={isUpdatingBorrower || isUpdatingUser}
//                       className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50 shadow-lg hover:shadow-green-500/30"
//                     >
//                       <FontAwesomeIcon icon={faCheck} />
//                       Save Changes
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//          </div>
//   );
// };

// export default ManageUsers;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUser,
  faEye,
  faCheckCircle,
  faTimesCircle,
  faTimes,
  faCheck,
  faSearch,
  faFilter,
  faPencilAlt,
  faUserEdit,
  faCaretDown,
  faRefresh,
  faDownload,
  faEllipsisV,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { useGetAllBorrowersQuery, useUpdateBorrowerUserMutation, useUpdateUserMutation } from '../../services/borrowerUserApiSlice';

const ManageUsers = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: borrowerData, isLoading, error, refetch } = useGetAllBorrowersQuery();
  const [updateBorrowerUser, { isLoading: isUpdatingBorrower }] = useUpdateBorrowerUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  useEffect(() => {
    if (borrowerData && Array.isArray(borrowerData)) {
      setBorrowers(borrowerData);
    }
  }, [borrowerData]);

  const totalBorrowers = borrowers.length;
  const activeBorrowersCount = borrowers.filter((b) => (b.status || '').toLowerCase() === 'active').length;
  const inactiveBorrowersCount = borrowers.filter((b) => (b.status || '').toLowerCase() === 'inactive').length;

  const filteredBorrowers = borrowers.filter((borrower) => {
    const term = searchTerm || '';
    const matchesSearch =
      term === '' ||
      borrower.borrowerId?.toString().includes(term) ||
      borrower.firstName?.toLowerCase().includes(term.toLowerCase()) ||
      borrower.lastName?.toLowerCase().includes(term.toLowerCase()) ||
      borrower.userName?.toLowerCase().includes(term.toLowerCase()) ||
      borrower.email?.toLowerCase().includes(term.toLowerCase()) ||
      borrower.phone?.includes(term);

    const status = (borrower.status || '').toLowerCase();
    const matchesStatus = statusFilter === 'All' ? true : status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleSaveBorrowerDetails = async () => {
    if (!selectedUser) return;
    try {
      const payload = {
        borrowerId: selectedUser.borrowerId,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        nic: selectedUser.nic,
        address: selectedUser.address,
        dob: selectedUser.dob,
        occupation: selectedUser.occupation,
      };
      await updateBorrowerUser(payload).unwrap();
      alert('Borrower details updated successfully!');
      setEditMode('view');
    } catch (err) {
      console.error('Failed to update borrower details:', err);
      alert('Failed to update borrower details.');
    }
  };

  const handleSaveUserDetails = async () => {
    if (!selectedUser) return;
    try {
      const payload = {
        userId: selectedUser.borrowerId,
        userName: selectedUser.userName,
        email: selectedUser.email,
        phone: selectedUser.phone,
        status: selectedUser.status,
      };
      await updateUser(payload).unwrap();
      refetch();
      alert('User details updated successfully!');
      setEditMode('view');
    } catch (err) {
      console.error('Failed to update user details:', err);
      alert('Failed to update user details.');
    }
  };

  const handleSave = async () => {
    if (editMode === 'borrower') {
      await handleSaveBorrowerDetails();
    } else if (editMode === 'user') {
      await handleSaveUserDetails();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium text-lg">Loading borrowers</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-6">Unable to load borrower data. Please check your connection and try again.</p>
            <div className="flex gap-3">
              <button
                onClick={() => refetch()}
                className="px-5 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FontAwesomeIcon icon={faUserEdit} className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Borrower Management</h1>
                <p className="text-gray-500 mt-1">Manage and update borrower profiles and account information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => refetch()}
                className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faRefresh} className="text-sm" />
                Refresh
              </button>
              <button className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                <FontAwesomeIcon icon={faDownload} className="text-sm" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Borrowers</p>
                  <p className="text-3xl font-bold text-gray-800">{totalBorrowers}</p>
                  <p className="text-xs text-gray-400 mt-2">All registered users</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-600">Showing {filteredBorrowers.length} records</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-600">{activeBorrowersCount}</p>
                  <p className="text-xs text-gray-400 mt-2">{((activeBorrowersCount / totalBorrowers) * 100 || 0).toFixed(1)}% of total</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(activeBorrowersCount / totalBorrowers) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Inactive</p>
                  <p className="text-3xl font-bold text-amber-600">{inactiveBorrowersCount}</p>
                  <p className="text-xs text-gray-400 mt-2">{((inactiveBorrowersCount / totalBorrowers) * 100 || 0).toFixed(1)}% of total</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-amber-500 text-xl" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(inactiveBorrowersCount / totalBorrowers) * 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faFilter} />
                    Status: {statusFilter}
                    <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isFilterOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
                      {['All', 'Active', 'Inactive'].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setStatusFilter(s);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                            statusFilter === s
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            s === 'Active' ? 'bg-green-500' :
                            s === 'Inactive' ? 'bg-amber-500' :
                            'bg-blue-500'
                          }`}></div>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="hidden sm:flex items-center gap-2">
                  {['All', 'Active', 'Inactive'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === s
                          ? s === 'Active'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : s === 'Inactive'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex-1 lg:max-w-md">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by ID, name, username, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Borrower Directory</h2>
                <p className="text-sm text-gray-500 mt-1">Manage all registered borrowers</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{filteredBorrowers.length}</span> of <span className="font-medium text-gray-700">{borrowers.length}</span> shown
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Borrower</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Account</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBorrowers.length > 0 ? (
                    filteredBorrowers.map((borrower) => (
                      <tr key={borrower.borrowerId} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-blue-600">#{borrower.borrowerId}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faUserCircle} className="text-blue-500 text-lg" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {borrower.firstName} {borrower.lastName}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">{borrower.nic || 'No NIC'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{borrower.userName}</div>
                            <div className="text-xs text-gray-500 mt-0.5">User Account</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900 flex items-center gap-2">
                              <span className="text-gray-400">{borrower.email}</span>
                            </div>
                            <div className="text-sm text-gray-600">{borrower.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              borrower.status?.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-amber-500'
                            }`}></div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              borrower.status?.toLowerCase() === 'active'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {borrower.status || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(borrower);
                                setEditMode('view');
                              }}
                              className="inline-flex items-center px-3.5 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-100 transition-all duration-150"
                            >
                              <FontAwesomeIcon icon={faEye} className="mr-2 text-sm" />
                              View
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faUsers} className="text-gray-400 text-2xl" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-700 mb-2">No borrowers found</h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm || statusFilter !== 'All' 
                              ? 'Try adjusting your search or filter criteria' 
                              : 'No borrowers have been registered yet'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{Math.min(filteredBorrowers.length, 10)}</span> results
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <span className="px-3 py-1.5 text-sm font-medium text-gray-700">1</span>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 scale-100 opacity-100"
            style={{ animation: 'slideIn 0.3s ease-out' }}
          >
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">User Profile</h2>
                  <p className="text-sm text-gray-500">Borrower ID: <span className="font-semibold">#{selectedUser.borrowerId}</span></p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setEditMode('view');
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-lg" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8">
              {editMode === 'view' ? (
                <div className="space-y-8">
                  {/* Borrower Details */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Personal Information
                      </h3>
                      <button
                        onClick={() => setEditMode('borrower')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-100 transition-all duration-150"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
                          <p className="text-gray-900 font-semibold text-lg">{selectedUser.firstName || '-'} {selectedUser.lastName || '-'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">NIC</label>
                          <p className="text-gray-900 font-medium">{selectedUser.nic || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Date of Birth</label>
                          <p className="text-gray-900 font-medium">{selectedUser.dob || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Occupation</label>
                          <p className="text-gray-900 font-medium">{selectedUser.occupation || 'Not provided'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Address</label>
                          <p className="text-gray-900 font-medium">{selectedUser.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Account Information
                      </h3>
                      <button
                        onClick={() => setEditMode('user')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded-lg border border-green-100 transition-all duration-150"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Username</label>
                          <p className="text-gray-900 font-semibold text-lg">{selectedUser.userName}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Email</label>
                          <p className="text-gray-900 font-medium flex items-center gap-2">
                            {selectedUser.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Phone</label>
                          <p className="text-gray-900 font-medium">{selectedUser.phone}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Status</label>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              selectedUser.status?.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-amber-500'
                            }`}></div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              selectedUser.status?.toLowerCase() === 'active'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {selectedUser.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-8 rounded-full ${editMode === 'borrower' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {editMode === 'borrower' ? 'Edit Personal Information' : 'Edit Account Information'}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editMode === 'borrower' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={selectedUser.firstName || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={selectedUser.lastName || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">NIC</label>
                          <input
                            type="text"
                            value={selectedUser.nic || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, nic: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={selectedUser.dob || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, dob: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                          <input
                            type="text"
                            value={selectedUser.occupation || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, occupation: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <input
                            type="text"
                            value={selectedUser.address || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                          <input
                            type="text"
                            value={selectedUser.userName || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={selectedUser.email || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={selectedUser.phone || ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <div className="flex gap-4">
                            {['Active', 'Inactive'].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setSelectedUser({ ...selectedUser, status })}
                                className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
                                  selectedUser.status === status
                                    ? status === 'Active'
                                      ? 'bg-green-50 text-green-700 border-green-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <FontAwesomeIcon 
                                    icon={status === 'Active' ? faCheckCircle : faTimesCircle} 
                                    className={selectedUser.status === status ? '' : 'text-gray-400'}
                                  />
                                  {status}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              {editMode === 'view' ? (
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setEditMode('view');
                  }}
                  className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-150"
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode('view')}
                    className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUpdatingBorrower || isUpdatingUser}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    {isUpdatingBorrower || isUpdatingUser ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheck} />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;
