import mysql from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config()

export const dashboardDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

// Verificar la conexión de la DB

export const testDBConnection = async () => {
  try {
    const connection = await dashboardDB.getConnection();
    console.log("Conectado a la base de datos")
  } catch (error) {
    console.error("Error al conectar a la base de datos: ", error.message)
    process.exit(1);
  }
}