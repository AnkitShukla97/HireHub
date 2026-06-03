import React, { ReactNode } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated = false,
  redirectTo = "/login",
}): ReactNode => {
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
