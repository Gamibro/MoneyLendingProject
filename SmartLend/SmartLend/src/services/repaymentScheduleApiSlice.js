// repaymentScheduleApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const repaymentScheduleApiSlice = createApi({
  reducerPath: "repaymentScheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44364/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["RepaymentSchedule"],
  endpoints: (builder) => ({
    getRepaymentScheduleByLoanId: builder.query({
      query: (loanId) => `RepaymentSchedule/GenerateScheduleByLoanId?loanId=${loanId}`,
      transformResponse: (response) => {
        return response?.ResultSet || [];
      },
      providesTags: ["RepaymentSchedule"],
    }),
  }),
});

export const {
  useGetRepaymentScheduleByLoanIdQuery,
} = repaymentScheduleApiSlice;