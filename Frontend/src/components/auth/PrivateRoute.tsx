import type { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

import { tokenAtom } from "../../store/atoms";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useRecoilValue(tokenAtom);

  return token ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
