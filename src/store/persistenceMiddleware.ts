import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./index";

const SAVED_JOBS_STORAGE_KEY = "savedJobs";

/**
 * Custom middleware to persist savedJobs slice to localStorage
 * Automatically saves state whenever savedJobs slice is modified
 */
export const persistenceMiddleware: Middleware<any, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    // Persist savedJobs to localStorage after any action
    try {
      const savedJobsState = state.savedJobs;
      localStorage.setItem(
        SAVED_JOBS_STORAGE_KEY,
        JSON.stringify(savedJobsState)
      );
    } catch (error) {
      console.error("Failed to persist savedJobs to localStorage:", error);
    }

    return result;
  };

/**
 * Load savedJobs from localStorage
 */
export const loadSavedJobsFromStorage = () => {
  try {
    const stored = localStorage.getItem(SAVED_JOBS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load savedJobs from localStorage:", error);
    return null;
  }
};
