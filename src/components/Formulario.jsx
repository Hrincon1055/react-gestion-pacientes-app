import React, { useState, useEffect } from "react";
// MIS COMPONENTES
import usePacientes from "../hooks/usePacientes";
import { Alerta } from "./Alerta";
// INICIO
export const Formulario = () => {
  // HOOKS
  const { guardarPaciente, paciente } = usePacientes();

  // STATE
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);
  // CONSTANTES
  const { msg } = alerta;
  // EFFECT
  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setSintomas(paciente.sintomas);
      setFecha(paciente.fecha.slice(0, 10));
      setId(paciente._id);
    }
  }, [paciente]);

  // FUNCIONES
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios.", error: true });
      return;
    }
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setAlerta({
      msg: "Guardado Correctamente",
      error: false,
    });
    setNombre("");
    setPropietario("");
    setEmail("");
    setSintomas("");
    setFecha("");
    setId(null);
  };
  // RENDER
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de pacientes.
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            type="text"
            id="propietario"
            placeholder="Nombre Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">
            Fecha Alta
          </label>
          <input
            type="date"
            id="fecha"
            placeholder="Nombre Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Agregar Paciente"}
          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};
