import axios from "axios";

export const obtenerInstitucionRequest = async()=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/institucion/obtener`);
}