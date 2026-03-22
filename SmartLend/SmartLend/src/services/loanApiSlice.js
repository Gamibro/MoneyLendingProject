// loanApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanApiSlice = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44364/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Loan"],
  endpoints: (builder) => ({
    // Get all loans with complete details
    getAllLoans: builder.query({
      query: () => "Loan/GetAllLoans",
      transformResponse: (response) => {
        return response?.ResultSet || [];
      },
      providesTags: ["Loan"],
    }),

    // Get loan by ID
    getLoanById: builder.query({
      query: (loanId) => `Loan/GetLoan/${loanId}`,
      providesTags: ["Loan"],
    }),

    // Update loan status
    updateLoanStatus: builder.mutation({
      query: ({ loanId, status }) => ({
        url: `Loan/UpdateLoanStatus/${loanId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Loan"],
    }),

    // Approve loan
    approveLoan: builder.mutation({
      query: (loanId) => ({
        url: `Loan/ApproveLoan/${loanId}`,
        method: "POST",
      }),
      invalidatesTags: ["Loan"],
    }),

    // Reject loan
    rejectLoan: builder.mutation({
      query: (loanId) => ({
        url: `Loan/RejectLoan/${loanId}`,
        method: "POST",
      }),
      invalidatesTags: ["Loan"],
    }),
  }),
});

export const {
  useGetAllLoansQuery,
  useGetLoanByIdQuery,
  useUpdateLoanStatusMutation,
  useApproveLoanMutation,
  useRejectLoanMutation,
} = loanApiSlice;