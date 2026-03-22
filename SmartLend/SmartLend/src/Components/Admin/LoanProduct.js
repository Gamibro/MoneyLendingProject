// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPencilAlt,
//   faCreditCard,
//   faCheckCircle,
//   faTimesCircle,
//   faDollarSign,
//   faArrowTrendUp,
//   faPlus,
// } from '@fortawesome/free-solid-svg-icons';
// // import { useGetAllLoanProductsQuery, useUpdateLoanProductStatusMutation, useAddLoanProductMutation } from '.../services/loanProductApiSlice';
// import { useGetAllLoanProductsQuery, useUpdateLoanProductStatusMutation, useAddLoanProductMutation } from '../../services/loanProductApiSlice';
// import AddLoanProduct from './AddLoanProduct';

// const LoanProduct = () => {
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [loanProducts, setLoanProducts] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   // NEW: store dropdown selection (0/1) while editing
//   const [selectedStatus, setSelectedStatus] = useState(1);

//   const { data: apiLoanProducts = [], isLoading, error } = useGetAllLoanProductsQuery();
//   const [updateLoanProductStatus, { isLoading: isUpdating }] = useUpdateLoanProductStatusMutation();
//   const [addLoanProduct, { isLoading: isAdding }] = useAddLoanProductMutation();

//   useEffect(() => {
//     if (apiLoanProducts && apiLoanProducts.length > 0) {
//       setLoanProducts(apiLoanProducts);
//     }
//   }, [apiLoanProducts]);

//   const totalProducts = loanProducts.length;
//   const activeProducts = loanProducts.filter((p) => p.isActive).length;
//   const inactiveProducts = loanProducts.filter((p) => !p.isActive).length;

//   const handleEditClick = (product) => {
//     setEditingProductId(product.loanProductId);
//     setSelectedStatus(product.isActive ? 1 : 0); // dropdown default = current status
//   };

//   const handleUpdateClick = async (productId) => {
//     try {
//       // ✅ send 1/0 as requested
//       await updateLoanProductStatus({
//         loanProductId: productId,
//         isActive: selectedStatus, // 1 or 0
//       }).unwrap();

//       // Update local state (keep your UI consistent)
//       setLoanProducts((prev) =>
//         prev.map((p) =>
//           p.loanProductId === productId
//             ? { ...p, isActive: selectedStatus === 1 }
//             : p
//         )
//       );

//       setEditingProductId(null);
//     } catch (err) {
//       console.error('Failed to update loan product status:', err);
//       alert('Failed to update product status. Please try again.');
//     }
//   };

//   const handleAddProduct = async (payload) => {
//     try {
//       const result = await addLoanProduct(payload).unwrap();
//       // Optionally, you could manually add to local state or let the cache invalidation handle it
//       // For now, the getAllLoanProducts query will be refetched automatically
//       alert('Loan product added successfully!');
//     } catch (err) {
//       console.error('Failed to add loan product:', err);
//       alert('Failed to add loan product. Please try again.');
//       throw err;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
//         <div className="text-white text-lg">Loading loan products...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md text-white">
//           <h2 className="text-lg font-bold mb-2">Error Loading Products</h2>
//           <p className="text-sm">
//             {error?.data?.message || 'Failed to load loan products. Please check your connection and try again.'}
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
//               <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-white" />
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
//               Loan Products
//             </h1>
//           </div>
//           <p className="text-blue-200 text-lg ml-16">Manage and monitor your loan portfolio with precision</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-blue-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-blue-300 text-sm font-bold uppercase tracking-widest">Total Products</p>
//                 <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition">
//                   <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-blue-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{totalProducts}</p>
//               <p className="text-blue-200 text-sm">Portfolio overview</p>
//             </div>
//           </div>

//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-green-400 shadow-lg hover:shadow-green-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-green-300 text-sm font-bold uppercase tracking-widest">Active</p>
//                 <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/40 transition">
//                   <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{activeProducts}</p>
//               <p className="text-green-200 text-sm">Running products</p>
//             </div>
//           </div>

//           <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600 hover:border-amber-400 shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-amber-300 text-sm font-bold uppercase tracking-widest">Inactive</p>
//                 <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/40 transition">
//                   <FontAwesomeIcon icon={faTimesCircle} className="text-2xl text-amber-300" />
//                 </div>
//               </div>
//               <p className="text-5xl font-bold text-white mb-2">{inactiveProducts}</p>
//               <p className="text-amber-200 text-sm">Suspended products</p>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 border-b border-slate-600 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <FontAwesomeIcon icon={faArrowTrendUp} className="text-white text-xl" />
//               <h2 className="text-xl font-bold text-white">Products Listing</h2>
//             </div>
//             <button
//               onClick={() => setIsAddModalOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-green-500/30"
//             >
//               <FontAwesomeIcon icon={faPlus} className="text-lg" />
//               <span>Add Loan Product</span>
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-blue-700 border-b border-slate-600">
//                   <th className="px-6 py-4 text-left text-white text-sm font-bold uppercase tracking-wider">ID</th>
//                   <th className="px-6 py-4 text-left text-sm text-white font-bold uppercase tracking-wider">Product Name</th>
//                   <th className="px-6 py-4 text-left text-sm text-white font-bold uppercase tracking-wider">Interest Rate</th>
//                   <th className="px-6 py-4 text-left text-sm text-white font-bold uppercase tracking-wider">Term</th>
//                   <th className="px-6 py-4 text-left text-white text-sm font-bold uppercase tracking-wider">Late Fee</th>
//                   <th className="px-6 py-4 text-center text-sm text-white font-bold uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-600">
//                 {loanProducts.map((product) => {
//                   const isEditing = editingProductId === product.loanProductId;

//                   return (
//                     <tr key={product.loanProductId} className="hover:bg-slate-700/50 transition-colors duration-200 group">
//                       <td className="px-6 py-5">
//                         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm">
//                           {product.loanProductId}
//                         </div>
//                       </td>

//                       <td className="px-6 py-5">
//                         <div>
//                           <p className="text-white font-semibold text-base">{product.loanProductName}</p>
//                           <p className="text-blue-200 text-xs mt-1">Loan ID: {product.loanProductId}</p>
//                         </div>
//                       </td>

//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 rounded-full bg-blue-400"></div>
//                           <span className="text-blue-100 font-bold text-lg">{product.interestRate}%</span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-5">
//                         <span className="text-slate-200 font-medium">{product.defaultTermMonths} months</span>
//                       </td>

//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-2">
//                           <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-sm" />
//                           <span className="text-green-300 font-semibold">{product.lateFeeFixedAmount}</span>
//                         </div>
//                       </td>

//                       {/* ✅ STATUS: badge normally, dropdown when editing */}
//                       <td className="px-6 py-5 text-center">
//                         {isEditing ? (
//                           <select
//                             value={selectedStatus}
//                             onChange={(e) => setSelectedStatus(Number(e.target.value))}
//                             className="bg-slate-900/40 border border-slate-500 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
//                           >
//                             <option value={1}>Active</option>
//                             <option value={0}>Inactive</option>
//                           </select>
//                         ) : (
//                           <span
//                             className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs uppercase tracking-wide ${
//                               product.isActive
//                                 ? 'bg-green-500/20 text-green-300 border border-green-500/40'
//                                 : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
//                             }`}
//                           >
//                             <span className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-400' : 'bg-amber-400'}`}></span>
//                             {product.isActive ? 'Active' : 'Inactive'}
//                           </span>
//                         )}
//                       </td>

//                       {/* ✅ ACTION: pencil normally, Update button when editing */}
//                       <td className="px-6 py-5 text-center">
//                         {isEditing ? (
//                           <button
//                             onClick={() => handleUpdateClick(product.loanProductId)}
//                             disabled={isUpdating}
//                             className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all shadow-lg hover:shadow-blue-500/30"
//                           >
//                             {isUpdating ? 'Updating...' : 'Update'}
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleEditClick(product)}
//                             className="bg-blue-500/30 hover:bg-blue-500/50 text-blue-300 p-2.5 rounded-lg transition-all border border-blue-500/40 hover:border-blue-400 shadow-lg hover:shadow-blue-500/30 inline-flex items-center justify-center"
//                             title="Edit status"
//                           >
//                             <FontAwesomeIcon icon={faPencilAlt} className="text-sm" />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="bg-slate-700/50 border-t border-slate-600 px-8 py-4 flex justify-between items-center">
//             <span className="text-blue-200 text-sm font-medium">
//               Showing <span className="text-blue-100 font-bold">{loanProducts.length}</span> product{loanProducts.length !== 1 ? 's' : ''}
//             </span>
//             <span className="text-slate-400 text-sm">
//               Last updated: <span className="text-blue-300">Today</span>
//             </span>
//           </div>
//         </div>

//         {/* Add Loan Product Modal */}
//         <AddLoanProduct
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//           onAdd={handleAddProduct}
//           isLoading={isAdding}
//         />

//       </div>
//     </div>
//   );
// };

// export default LoanProduct;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCreditCard,
  faCheckCircle,
  faTimesCircle,
  faDollarSign,
  faArrowTrendUp,
  faPlus,
  faSpinner,
  faChartLine,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useGetAllLoanProductsQuery, useUpdateLoanProductStatusMutation, useAddLoanProductMutation } from '../../services/loanProductApiSlice';
import AddLoanProduct from './AddLoanProduct';

const LoanProduct = () => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [loanProducts, setLoanProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: apiLoanProducts = [], isLoading, error } = useGetAllLoanProductsQuery();
  const [updateLoanProductStatus, { isLoading: isUpdating }] = useUpdateLoanProductStatusMutation();
  const [addLoanProduct, { isLoading: isAdding }] = useAddLoanProductMutation();

  useEffect(() => {
    if (apiLoanProducts && apiLoanProducts.length > 0) {
      setLoanProducts(apiLoanProducts);
    }
  }, [apiLoanProducts]);

  // Filter products based on search term
  const filteredProducts = loanProducts.filter(product =>
    product.loanProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.loanProductId.toString().includes(searchTerm)
  );

  const totalProducts = loanProducts.length;
  const activeProducts = loanProducts.filter((p) => p.isActive).length;
  const inactiveProducts = loanProducts.filter((p) => !p.isActive).length;

  const handleEditClick = (product) => {
    setEditingProductId(product.loanProductId);
    setSelectedStatus(product.isActive ? 1 : 0);
  };

  const handleUpdateClick = async (productId) => {
    try {
      await updateLoanProductStatus({
        loanProductId: productId,
        isActive: selectedStatus,
      }).unwrap();

      setLoanProducts((prev) =>
        prev.map((p) =>
          p.loanProductId === productId
            ? { ...p, isActive: selectedStatus === 1 }
            : p
        )
      );

      setEditingProductId(null);
    } catch (err) {
      console.error('Failed to update loan product status:', err);
      alert('Failed to update product status. Please try again.');
    }
  };

  const handleAddProduct = async (payload) => {
    try {
      await addLoanProduct(payload).unwrap();
      alert('Loan product added successfully!');
    } catch (err) {
      console.error('Failed to add loan product:', err);
      alert('Failed to add loan product. Please try again.');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin mb-4">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600" />
        </div>
        <div className="text-gray-600 text-lg font-medium">Loading loan products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center border border-red-100">
          <FontAwesomeIcon icon={faTimesCircle} className="text-5xl text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-6">
            {error?.data?.message || 'Failed to load loan products. Please check your connection and try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Loan Products
                </h1>
                <p className="text-gray-600 mt-1">Manage your loan portfolio efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25"
            >
              <FontAwesomeIcon icon={faPlus} className="text-lg" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{totalProducts}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-blue-600" />
                </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Active</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeProducts}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-green-600" />
                </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${totalProducts ? (activeProducts / totalProducts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Inactive</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{inactiveProducts}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-2xl text-amber-600" />
                </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${totalProducts ? (inactiveProducts / totalProducts) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header with Search */}
          <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">All Loan Products</h2>
              <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                {filteredProducts.length} products
              </span>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Interest Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Term</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Late Fee</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const isEditing = editingProductId === product.loanProductId;

                  return (
                    <tr 
                      key={product.loanProductId} 
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-100">
                            #{product.loanProductId}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div>
                          <p className="text-gray-900 font-medium">{product.loanProductName}</p>
                          <p className="text-gray-500 text-sm mt-0.5">ID: {product.loanProductId}</p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-gray-900 font-semibold">{product.interestRate}%</span>
                          <span className="text-gray-500 text-sm">APR</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {product.defaultTermMonths} months
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faDollarSign} className="text-green-600 text-sm" />
                          <span className="text-gray-900 font-medium">${product.lateFeeFixedAmount}</span>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-5 text-center">
                        {isEditing ? (
                          <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(Number(e.target.value))}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-32"
                          >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm ${
                              product.isActive
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-5 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditingProductId(null)}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateClick(product.loanProductId)}
                              disabled={isUpdating}
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                              {isUpdating ? (
                                <>
                                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(product)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-100"
                            title="Edit status"
                          >
                            <FontAwesomeIcon icon={faPencilAlt} className="text-sm" />
                            Edit Status
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="text-gray-400 mb-3">
                  <FontAwesomeIcon icon={faCreditCard} className="text-4xl" />
                </div>
                <h3 className="text-gray-700 font-medium mb-1">No products found</h3>
                <p className="text-gray-500 text-sm">
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first loan product to get started'}
                </p>
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{loanProducts.length}</span> products
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-900 font-medium">Last updated:</span>
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>

        {/* Add Loan Product Modal */}
        <AddLoanProduct
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
          isLoading={isAdding}
        />

      </div>
    </div>
  );
};

export default LoanProduct;