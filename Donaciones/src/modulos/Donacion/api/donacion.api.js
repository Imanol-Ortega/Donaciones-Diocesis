import axios from "axios";

export const guardarDonacionRequest = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/donado/guardar`,values);
};

export const obtenerDonacionRequest = async()=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donado/obtener`)
};

export const eliminarDonadoRequest = async(id)=>{
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/donado/eliminar/${id}`);
}
