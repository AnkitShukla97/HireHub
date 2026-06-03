import React, { ReactNode, MouseEvent } from "react";

interface JobCardProps {
  jobId?: string;
  jobTitle?: string;
  company?: string;
  description?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  jobId,
  jobTitle,
  company,
  description,
  children,
  onClick,
}): ReactNode => {
  return (
    <div onClick={onClick} role="button" tabIndex={0}>
      {children || (
        <>
          {jobTitle && <h3>{jobTitle}</h3>}
          {company && <p>{company}</p>}
          {description && <p>{description}</p>}
        </>
      )}
    </div>
  );
};

export default JobCard;
