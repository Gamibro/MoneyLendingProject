import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanPaymentAllocationApiSlice = createApi({
  reducerPath: "loanPaymentAllocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44364/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["ScheduleSummary", "AllocationHistory"],
  endpoints: (builder) => ({
    // Get schedule summary by payment ID
    getScheduleSummaryByPaymentId: builder.query({
      query: (paymentId) => `PaymentAllocation/GetScheduleSummaryByPaymentId?paymentId=${paymentId}`,
      transformResponse: (response) => {
        return response?.ResultSet || [];
      },
      providesTags: ["ScheduleSummary"],
    }),

    // Get allocation history
    getAllocationHistory: builder.query({
      query: ({ paymentId, scheduleId }) => 
        `PaymentAllocation/GetAllocationHistory?paymentId=${paymentId}&scheduleId=${scheduleId}`,
      transformResponse: (response) => {
        return response?.ResultSet || [];
      },
      providesTags: ["AllocationHistory"],
    }),
  }),
});

export const { 
  useGetScheduleSummaryByPaymentIdQuery, 
  useGetAllocationHistoryQuery 
} = loanPaymentAllocationApiSlice;