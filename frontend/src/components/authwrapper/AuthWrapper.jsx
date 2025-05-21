import { useEffect } from "react";
import * as auth from "../../stores/auth";
import { useNavigate } from "react-router";

function AuthWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthorized()) {
      navigate("/login");
    }
  }, []);

  return children;
}

export default AuthWrapper;
