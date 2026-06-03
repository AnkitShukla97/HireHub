import React, { ReactNode } from "react";
import { createBrowserRouter, RouteObject } from "react-router";
import Dashboard from "../pages/Dashboard";
import JobDetail from "../pages/JobDetail";
import SavedJobs from "../pages/SavedJobs";
import Login from "../pages/Login";

interface AppRoute extends RouteObject {
  path: string;
  element: ReactNode;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
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
