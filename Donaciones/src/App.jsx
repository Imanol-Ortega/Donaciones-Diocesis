import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FormDonante from "./modulos/Donante/formulario/FormDonante";
import VistaDonante from "./modulos/Donante/vista/VistaDonante";
import CardDonante from "./modulos/Donante/card/CardDonante";
import NotFound from "./componentes/NotFound/NotFound";
import FormDonacion from "./modulos/Donacion/formulario/FormDonacion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "./componentes/Navbar/NavBar";
import VistaInventario from "./modulos/Inventario/vista/VistaInventario";
import FormInstitucion from "./modulos/Institucion/formulario/FormInstitucion";
import VistaInstitucion from "./modulos/Institucion/vista/VistaInstitucion";
import VistaDonacion from "./modulos/Donacion/vista/VistaDonacion";
import Login from "./modulos/Sesion/formulario/Login";
import { useEffect } from "react";
import { useAuth } from "./contexto/AuthProvider";
import { useLocation } from "react-router-dom";

function App() {
    const { user, setuser } = useAuth();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        const usuario = localStorage.getItem("usuario");
        setuser(usuario);
    }, [setuser, location]);
    return (
        <>
            <div className="h-full">
                <div className="mx-auto">
                    {user && <NavBar />}
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />

                        {user && (
                            <>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate
                                            to="/donacion/vista"
                                            replace
                                        />
                                    }
                                />

                                <Route
                                    path="/donacion/agregar"
                                    element={<FormDonante />}
                                />
                                <Route
                                    path="/donacion/vista"
                                    element={<VistaDonante />}
                                />
                                <Route
                                    path="/donacion/vista/:id"
                                    element={<CardDonante />}
                                />
                                <Route
                                    path="/donar/nuevo"
                                    element={<FormDonacion />}
                                />

                                <Route
                                    path="/donar/vista"
                                    element={<VistaDonacion />}
                                />

                                <Route
                                    path="/inventario/vista"
                                    element={<VistaInventario />}
                                />

                                <Route
                                    path="/institucion/nuevo"
                                    element={<FormInstitucion />}
                                />
                                <Route
                                    path="/institucion/vista"
                                    element={<VistaInstitucion />}
                                />
                            </>
                        )}
                    </Routes>
                    <Toaster />
                    <Analytics />
                    <SpeedInsights />
                </div>
            </div>
        </>
    );
}

export default App;
