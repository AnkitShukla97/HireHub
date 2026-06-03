import React from "react";
import {createBrowserRouter} from "react-router";
import Dashboard from "../pages/Dashboard";
import JobDetail from "../pages/JobDetail";
import SavedJobs from "../pages/SavedJobs";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/job/:id",
    element: <JobDetail />,
  },
  {
    path: "/saved-jobs",
    element: <SavedJobs />,
  },
]);

export default router;