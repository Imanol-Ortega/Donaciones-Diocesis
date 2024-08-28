import axios from "axios"

export const guardarDonanteRequest = async(values)=>{
    return await axios.post('http://localhost:3000/donante/guardar',values);
};

export const obtenerDonantesRequest = async()=>{
    return await axios.get('http://localhost:3000/donante/obtener');
};

export const obtenerUnaDonante = async(id)=>{
    return await axios.get(`http://localhost:3000/donante/obtener/${id}`);
}