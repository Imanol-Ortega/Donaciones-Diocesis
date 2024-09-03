import axios from "axios"

export const guardarInventarioRequest = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/inventario/guardar`,values)
};

export const obtenerInventarioRequest = async()=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/inventario/obtener`)
};