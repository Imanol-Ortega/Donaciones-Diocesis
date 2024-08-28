import axios from "axios"

export const guardarInventarioRequest = async(values)=>{
    return await axios.post('http://localhost:3000/inventario/guardar',values)
}