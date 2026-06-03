import React, { ReactNode } from "react";

interface JobDetailProps {
  children?: ReactNode;
}

const JobDetail: React.FC<JobDetailProps> = (): ReactNode => {
  return (
    <div>
      <h1>Job Detail</h1>
    </div>
  );
};

export default JobDetail;
