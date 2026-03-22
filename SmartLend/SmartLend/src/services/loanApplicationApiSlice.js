import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loanApplicationApiSlice = createApi({
  reducerPath: "loanApplicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44364/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["LoanApplication"],
  endpoints: (builder) => ({
    // Get all loan applications
    getAllLoanApplications: builder.query({
      query: () => "LoanApplication/GetAllLoanApplications",
      transformResponse: (response) => {
        // Extract ResultSet from response
        return response?.ResultSet || [];
      },
      providesTags: ["LoanApplication"],
    }),

    // Get single loan application
    getLoanApplicationById: builder.query({
      query: (id) => `LoanApplication/GetLoanApplications/${id}`,
      providesTags: ["LoanApplication"],
    }),

    // Update loan application status
    changeLoanApplicationStatus: builder.mutation({
      query: ({ applicationId, status }) => ({
        url: `LoanApplication/ChangeLoanApplicationStatus/${applicationId}`,
        method: "PUT",
        body: { applicationId, status },
      }),
      invalidatesTags: ["LoanApplication"],
    }),

    // Send message to borrower
    sendMessage: builder.mutation({
      query: ({ phone, message }) => ({
        url: `User/SendMessage`,
        method: "POST",
        body: { phone, message },
      }),
    }),
  }),
});

export const {
  useGetAllLoanApplicationsQuery,
  useGetLoanApplicationByIdQuery,
  useChangeLoanApplicationStatusMutation,
  useSendMessageMutation,
} = loanApplicationApiSlice;
