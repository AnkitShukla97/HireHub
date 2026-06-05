import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../types/job";
import { ApplicationStatus } from "../types/application";

interface SavedJob extends Job {
  applicationStatus?: ApplicationStatus;
}

interface SavedJobsState {
  jobs: SavedJob[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SavedJobsState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {
    // Add a job to saved jobs (Immer makes direct mutation safe)
    addJob: (state, action: PayloadAction<Job>) => {
      const exists = state.jobs.some((job) => job.id === action.payload.id);
      if (!exists) {
        state.jobs.push({
          ...action.payload,
          applicationStatus: "idle",
        });
      }
    },
    // Remove a job by ID (Immer-safe mutation)
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    // Update application status for a job
    updateStatus: (
      state,
      action: PayloadAction<{ jobId: string; status: ApplicationStatus }>
    ) => {
      const job = state.jobs.find((j) => j.id === action.payload.jobId);
      if (job) {
        job.applicationStatus = action.payload.status;
      }
    },
    // Set all saved jobs
    setSavedJobs: (state, action: PayloadAction<SavedJob[]>) => {
      state.jobs = action.payload;
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Hydrate from localStorage
    hydrate: (state, action: PayloadAction<SavedJobsState>) => {
      return action.payload;
    },
  },
});

export const {
  addJob,
  removeJob,
  updateStatus,
  setSavedJobs,
  setLoading,
  setError,
  hydrate,
} = savedJobsSlice.actions;
export default savedJobsSlice.reducer;