import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44364/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    // Register Borrower
    registerUser: builder.mutation({
      query: (payload) => ({
        url: "User/RegisterBorrower",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // Send OTP
    sendOtp: builder.mutation({
      query: (payload) => ({
        url: "User/SendOtp",
        method: "POST",
        body: { phone: payload.phone },
      }),
    }),


    getAllUsers: builder.query({
      query: () => "User/GetAllUsers",
      providesTags: ["User"],
    }),

    // Verify OTP
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "User/VerifyOtp",
        method: "POST",
        body: { phone: payload.phone, otpCode: payload.otpCode },
      }),
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

    // Login
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "User/Login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
} = apiSlice;
