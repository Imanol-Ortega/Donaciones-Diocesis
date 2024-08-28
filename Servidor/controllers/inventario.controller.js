import {pool} from "../db.js";

export const guardarInventario = async(req,res)=>{
    try {
        const rb = req.body;
        
        for(let i=0;i<rb.length;i++){
            const rs = await pool.query('INSERT INTO inventario (inventariocantidad,inventarionombre,inventariodescripcion,donanteid) VALUES ($1,$2,$3,$4)',
                                        [rb[i].cantidad,rb[i].nombre,rb[i].descripcion,rb[i].donanteid]);
        }

        const result = await pool.query('UPDATE donante SET donanteestado = TRUE WHERE donanteid = $1',[rb[0].donanteid]);

        res.status(200).json({message:'Guardado Correctamente'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerInventario = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM inventario WHERE inventarioestado = true');
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

export const obtenerUnInventario = async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM inventario WHERE inventarioid = $1',[req.params.id]);
        if(result.rows == 0){
            return res.status(404).json({message:'No Existe el Articulo'});
        }
        res.status(200).json(result.rows);
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};