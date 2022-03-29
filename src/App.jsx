import { BrowserRouter, Routes, Route } from "react-router-dom";
// MIS COMPONENTES
import { AuthLayout } from "./layout/AuthLayout";
import { RutaProtegida } from "./layout/RutaProtegida";
import { ConfirmarCuenta } from "./pages/ConfirmarCuenta";
import { Login } from "./pages/Login";
import { NuevoPassword } from "./pages/NuevoPassword";
import { OlvidePassword } from "./pages/OlvidePassword";
import { Registrar } from "./pages/Registrar";
import { AdministrarPecientes } from "./pages/AdministrarPecientes";
// PROVIDER
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";
import { EditarPerfil } from "./pages/EditarPerfil";
import { CambiarPassword } from "./pages/CambiarPassword";
// INICIO
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPecientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
