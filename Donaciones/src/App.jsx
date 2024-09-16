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
import { useLocation } from "react-router-dom";
import VistaInventario from "./modulos/Inventario/vista/VistaInventario";

function App() {
    const location = useLocation();
    return (
        <>
            <div className="h-full">
                <div className="mx-auto">
                    {location.pathname !== "/donacion/nuevo" && <NavBar />}
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route
                            path="/"
                            element={<Navigate to="/donacion/nuevo" replace />}
                        />
                        <Route
                            path="/donacion/nuevo"
                            element={<FormDonante />}
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
                        <Route path="/donar/nuevo" element={<FormDonacion />} />
                        <Route
                            path="/inventario/vista"
                            element={<VistaInventario />}
                        />
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
