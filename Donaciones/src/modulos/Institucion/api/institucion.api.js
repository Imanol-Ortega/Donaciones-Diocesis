import axios from "axios";

export const obtenerInstitucionRequest = async()=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/institucion/obtener`);
}

export const guardarInstitucionRequest = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/institucion/guardar`,values);
}

export const eliminarInstitucionRequest = async(id)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/institucion/eliminar/${id}`)
}