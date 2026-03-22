import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanProductApiSlice = createApi({
  reducerPath: "loanProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44364/",prepareHeaders: (headers, { getState }) => {
      
      const token = localStorage.getItem("token");

      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    }, }),
  tagTypes: ["LoanProduct"],
  endpoints: (builder) => ({
    // Get all loan products
    getAllLoanProducts: builder.query({
      query: () => "LoanProduct/GetAllLoanProducts",
      transformResponse: (response) => {
        // Extract ResultSet from response
        return response?.ResultSet || [];
      },
      providesTags: ["LoanProduct"],
    }),

    // Update loan product status
    updateLoanProductStatus: builder.mutation({

      query: ({ loanProductId, isActive }) => ({
        url: `LoanProduct/ChangeLoanProductStatus/${loanProductId}`,
        method: "PUT",
        body: { loanProductId, isActive },
      }),
      invalidatesTags: ["LoanProduct"],
    }),

    // Get single loan product
    getLoanProductById: builder.query({
      query: (id) => `LoanProduct/GetLoanProduct/${id}`,
      providesTags: ["LoanProduct"],
    }),

    // Add new loan product
    addLoanProduct: builder.mutation({
      query: (payload) => ({
        url: "LoanProduct/AddLoanProduct",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LoanProduct"],
    }),
  }),
});

export const {
  useGetAllLoanProductsQuery,
  useUpdateLoanProductStatusMutation,
  useGetLoanProductByIdQuery,
  useAddLoanProductMutation,
} = loanProductApiSlice;
