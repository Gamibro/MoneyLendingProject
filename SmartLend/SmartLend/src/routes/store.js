import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import { loanProductApiSlice } from "../services/loanProductApiSlice";
import { loanApplicationApiSlice } from "../services/loanApplicationApiSlice";
import {borrowerUserApiSlice} from "../services/borrowerUserApiSlice";
import {loanApiSlice} from "../services/loanApiSlice";
import { repaymentScheduleApiSlice } from "../services/repaymentScheduleApiSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [loanProductApiSlice.reducerPath]: loanProductApiSlice.reducer,
    [loanApiSlice.reducerPath]:loanApiSlice.reducer,
    [loanApplicationApiSlice.reducerPath]: loanApplicationApiSlice.reducer,
    [borrowerUserApiSlice.reducerPath]: borrowerUserApiSlice.reducer,
    [repaymentScheduleApiSlice.reducerPath]: repaymentScheduleApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(loanProductApiSlice.middleware)
      .concat(loanApplicationApiSlice.middleware)
      .concat(borrowerUserApiSlice.middleware)
      .concat(loanApiSlice.middleware)
      .concat(repaymentScheduleApiSlice.middleware),
});
