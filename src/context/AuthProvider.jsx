import { useState, useEffect, createContext } from "react";
// MIS COMPONENTES
import clienteAxios from "../config/axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // STATE
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  // EFFECT
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios.get("/veterinarios/perfil", config);
        setAuth(data.veterinario);
      } catch (error) {
        console.log(`ERROR: ${error.response.data.msg}`);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };
  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: "Actualizado correctamente",
        error: false,
      };
    } catch (error) {
      console.log(`ERROR: ${error.response.data.msg}`);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };
  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/veterinarios/actualizar-password`;
      const { data } = await clienteAxios.put(url, datos, config);
      return {
        msg: data.msg,
        error: false,
      };
    } catch (error) {
      console.log(`ERROR: ${error.response.data.msg}`);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };
  // RENDER
  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          cargando,
          setAuth,
          cerrarSesion,
          actualizarPerfil,
          guardarPassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthProvider };
export default AuthContext;
