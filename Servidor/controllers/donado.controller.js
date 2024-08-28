import {pool} from "../db.js";

export const guardarDonado = async(req,res)=>{
    try {
        const {institucionid,inventario} = req.body;

        for(let i=0; i<inventario.length;i++){
            const rs = await pool.query('INSERT INTO donado (institucionid,inventarioid) VALUES($1,$2)',
                                        [institucionid,inventario[i].inventarioid]);
            const rs2 = await pool.query('UPDATE inventario SET inventarioestado = false WHERE inventarioid = $1',[inventario[i].inventarioid]);
        }

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerDonados = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const obtenerUnDonado = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};