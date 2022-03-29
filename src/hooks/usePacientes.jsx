import { useContext } from "react";
// MIS COMPONENTES
import PacientesContext from "../context/PacientesProvider";
// INICIO
const usePacientes = () => {
  return useContext(PacientesContext);
};

export default usePacientes;
