import React, { ReactNode } from "react";

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = (): ReactNode => {
  return <div>Dashbaord</div>;
};

export default Dashboard;
