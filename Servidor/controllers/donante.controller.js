import {pool} from "../db.js";

export const guardarDonacion = async(req,res)=>{
    try {
        const {nombre,telefono,direccion,donacion,observacion} = req.body;
        const result = await pool.query('INSERT INTO donante (donantenombre,donantetelefono,donantedireccion,donantedonacion,donanteobservacion,donanteestado) VALUES ($1,$2,$3,$4,$5,$6)',
                                        [nombre,telefono,direccion,donacion,observacion,0])

        res.status(200).json({message:'Guardado Correctamente'})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerDonacion = async(req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM donante WHERE donanteestado = false');

        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUnaDonacion = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM donante WHERE donanteid = $1',[req.params.id]);
        if(result.rows == 0){
            return res.status(404).json({message:'No existe la donacion'});
        }
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};