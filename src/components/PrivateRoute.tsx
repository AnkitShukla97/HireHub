import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppHooks";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): ReactNode => {
  const user = useAppSelector((state) => state.auth.user);

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
