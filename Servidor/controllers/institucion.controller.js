import {pool} from "../db.js";


export const obtenerInstituciones = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM institucion');

        res.json(result.rows);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}