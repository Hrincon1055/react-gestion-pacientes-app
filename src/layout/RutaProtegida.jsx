import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// MIS COMPONENTES
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import useAuth from "../hooks/useAuth";
// INICIO
export const RutaProtegida = () => {
  // HOOKS
  const { auth, cargando } = useAuth();
  // RENDER
  if (cargando) {
    return <p>CARGANDO...</p>;
  }
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};
