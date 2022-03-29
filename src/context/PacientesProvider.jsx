import { useState, useEffect, createContext } from "react";
// MIS COMPONENTES
import clienteAxios from "../config/axios";
const PacientesContext = createContext();
const PacientesProvider = ({ children }) => {
  // STATE
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  // EFFECT
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("/pacientes", config);
        setPacientes(data.pacientes);
      } catch (error) {
        console.log("ERROR:", error);
      }
    };
    obtenerPacientes();
  }, []);

  // FUNCIONES
  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );
        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data.pacienteUpdate._id
            ? data.pacienteUpdate
            : pacienteState
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(`ERROR: ${error.response.data.msg}`);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } =
          data.pacienteSave;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(`ERROR: ${error.response.data.msg}`);
      }
    }
  };
  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };
  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Confirmas que deseas eliminar ?");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
        const pacientesActualizado = pacientes.filter(
          (pacienteState) => pacienteState._id !== id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(`ERROR: ${error.response.data.msg}`);
      }
    }
  };
  // RENDER
  return (
    <>
      <PacientesContext.Provider
        value={{
          pacientes,
          paciente,
          guardarPaciente,
          setEdicion,
          eliminarPaciente,
        }}
      >
        {children}
      </PacientesContext.Provider>
    </>
  );
};
export { PacientesProvider };
export default PacientesContext;
