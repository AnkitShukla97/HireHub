export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
  };
  status: number;
}

import axiosInstance from "./axiosInstance";
import { Job } from "../types/job";

//Fetch all jobs
export const getJobs = (): Promise<ApiResponse<Job[]>> => {
  return axiosInstance.get("/jobs").then((response) => response.data);
};

//Fetch a job by ID
export const getJobById = (id: string): Promise<ApiResponse<Job>> => {
  return axiosInstance.get(`/jobs/${id}`).then((response) => response.data);
};

//Apply to a job
export const applyToJob = (jobId: string, applicationData: unknown): Promise<ApiResponse<unknown>> => {
  return axiosInstance
    .post(`/jobs/${jobId}/apply`, applicationData)
    .then((response) => response.data);
};
