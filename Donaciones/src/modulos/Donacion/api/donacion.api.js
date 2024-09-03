import axios from "axios";

export const guardarDonacionRequest = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/donado/guardar`,values);
};

