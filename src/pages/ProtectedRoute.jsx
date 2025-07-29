import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Loding from "../ui/Loding";

function ProtectedRoute({ children }) {
  const [auth, setauth] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/verify", {
          withCredentials: true,
        });
        setauth(true);
      } catch (err) {
        console.log(err.message);
        setauth(false);
      }
    };
    authCheck();
  }, []);
  if (auth === null) return <Loding />;
  if (!auth) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
