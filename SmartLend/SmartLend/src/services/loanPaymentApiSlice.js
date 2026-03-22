import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanPaymentApiSlice = createApi({
  reducerPath: "loanPaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44364/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["LoanPayment"],
  endpoints: (builder) => ({
    // Get all loan payments
    getAllLoanPayments: builder.query({
      query: () => "Payment/GetAllPayments",
      transformResponse: (response) => {
        return response?.ResultSet || [];
      },
      providesTags: ["LoanPayment"],
    }),
  }),
});

export const { useGetAllLoanPaymentsQuery } = loanPaymentApiSlice;