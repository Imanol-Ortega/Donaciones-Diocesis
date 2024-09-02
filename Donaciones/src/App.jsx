import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FormDonante from "./modulos/Donado/formulario/FormDonante";
import VistaDonante from "./modulos/Donado/vista/VistaDonante";
import CardDonante from "./modulos/Donado/card/CardDonante";
import NotFound from "./componentes/NotFound/NotFound";

function App() {
    return (
        <>
            <div className="h-full">
                <div className="mx-auto">
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
                            path="/donacion/vista"
                            element={<VistaDonante />}
                        />
                        <Route
                            path="/donacion/vista/:id"
                            element={<CardDonante />}
                        />
                    </Routes>
                    <Toaster />
                </div>
            </div>
        </>
    );
}

export default App;
