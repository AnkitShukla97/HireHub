import React, { ReactNode } from "react";
import router from "./routes/AppRoutes";
import { RouterProvider } from "react-router";

interface AppProps {
  children?: ReactNode;
}

const App: React.FC<AppProps> = (): ReactNode => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
