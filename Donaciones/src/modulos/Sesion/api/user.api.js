import axios from 'axios'

export const login = async(values)=>{
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,values)
}