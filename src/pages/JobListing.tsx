import React, { ReactNode } from "react";

interface JobListingProps {
  children?: ReactNode;
}

const JobListing: React.FC<JobListingProps> = (): ReactNode => {
  return (
    <div>
      <h1>Job Listing</h1>
    </div>
  );
};

export default JobListing;
