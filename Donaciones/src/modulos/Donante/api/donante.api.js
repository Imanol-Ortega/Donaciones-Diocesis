import axios from "axios"

export const guardarDonanteRequest = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/donante/guardar`,values);
};

export const obtenerDonantesRequest = async()=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donante/obtener`);
};

export const obtenerUnaDonante = async(id)=>{
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/donante/obtener/${id}`);
}