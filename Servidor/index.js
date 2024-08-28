import express from 'express'
import { PORT } from './config.js'
import cors from 'cors'

import donanteRoutes from './routes/donante.routes.js'
import inventarioRoutes from './routes/inventario.routes.js'
import institucionRoutes from './routes/institucion.routes.js'
import donadoRoutes from './routes/donado.routes.js'


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(donanteRoutes);
app.use(inventarioRoutes);
app.use(institucionRoutes);
app.use(donadoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
