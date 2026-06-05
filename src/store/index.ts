import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import savedJobsReducer from "../slices/savedJobsSlice";
import { persistenceMiddleware, loadSavedJobsFromStorage } from "./persistenceMiddleware";

// Load initial savedJobs state from localStorage
const preloadedState = {
  savedJobs: loadSavedJobsFromStorage() || {
    jobs: [],
    isLoading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    savedJobs: savedJobsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;