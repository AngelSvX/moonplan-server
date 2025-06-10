// Todas las importaciones realizadas
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {dashboardDB, testDBConnection} from './src/models/dashboardDB.js';
import authRouter from './src/api/authRouters.js';
import crudRouter from './src/api/crudRouters.js';
import dashboardRouter from './src/api/dashboardRouters.js';

// Configuración del servidor
const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Rutas
app.use('/api/v1', authRouter)
app.use('/api/v1', crudRouter)
app.use('/api/v1', dashboardRouter)

app.listen(process.env.PORT, () => {
  console.log(`Corriendo en el puerto ${process.env.PORT}`)
})

testDBConnection();