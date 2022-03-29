import { useContext } from "react";
// MIS COMPONENTES
import AuthContext from "../context/AuthProvider";

// INICIO
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
