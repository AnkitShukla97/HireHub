import React, { ReactNode } from "react";

interface LoginProps {
  children?: ReactNode;
}

const Login: React.FC<LoginProps> = (): ReactNode => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
