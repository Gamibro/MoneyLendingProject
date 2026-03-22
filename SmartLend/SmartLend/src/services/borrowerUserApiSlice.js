import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowerUserApiSlice = createApi({
  reducerPath: "borrowerUserApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://localhost:44364/" ,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Borrower"],
  endpoints: (builder) => ({
    // Get all borrowers with complete details
    getAllBorrowers: builder.query({
      query: () => "Borrower/GetAllBorrowers",
      transformResponse: (response) => {
        // Extract ResultSet from response
        return response?.ResultSet || [];
      },
      providesTags: ["Borrower"],
    }),

    // Get single borrower by ID
    getBorrowerById: builder.query({
      query: (borrowerId) => `Borrower/GetBorrower/${borrowerId}`,
      providesTags: ["Borrower"],
    }),

      // Update user (Admin)
  updateUser: builder.mutation({
    query: (payload) => ({
      url: `User/UpdateUser/${payload.userId}`,
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: ["User"],
  }),

    // Update borrower details (firstName, lastName, nic, address, dob, occupation)
    updateBorrowerUser: builder.mutation({
      query: (payload) => ({
        url: `Borrower/UpdateBorrower/${payload.borrowerId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Borrower"],
    }),
  })
});

export const {
  useGetAllBorrowersQuery,
  useGetBorrowerByIdQuery,
  useUpdateUserMutation,
  useUpdateBorrowerUserMutation,
} = borrowerUserApiSlice;
