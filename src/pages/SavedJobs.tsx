import React, { ReactNode } from "react";

interface SavedJobsProps {
  children?: ReactNode;
}

const SavedJobs: React.FC<SavedJobsProps> = (): ReactNode => {
  return (
    <div>
      <h1>Saved Jobs</h1>
    </div>
  );
};

export default SavedJobs;
