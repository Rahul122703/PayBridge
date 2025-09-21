import { configureStore } from "@reduxjs/toolkit";

import {
  AuthReducer,
  UiReducer,
  TransactionReducer,
} from "../features/featuresIndex";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ui: UiReducer,
    transactions: TransactionReducer,
  },
});
