import { dashboardDB } from "../models/dashboardDB.js";
import bcryptjs, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

// Se crea un usuario el cual será el admin (Ya no se usará esta función)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const hashedPassword = await bcryptjs.hash(password, 10)

    const query = "INSERT INTO usercredentials(username, email, password, role) VALUES(?,?,?,?)";
    const [result] = await dashboardDB.execute(query, [username, email, hashedPassword, role]);

    console.log("Usuario creado con éxito:", result);

    res.status(201).json({
      message: "Usuario creado con éxito",
      userId: result.insertId
    });

  } catch (err) {
    console.error("Error al crear usuario:", err.message);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};


// Se verifica que el usuario exista y se le genera el Token.
export const enterUser = async (req, res) => {
  const { username, password } = req.body
  
  try {
    
    // Detectaremos si el usuario existe mediante el usuario
    const query = "SELECT * FROM usercredentials WHERE username = ?"
    const [rows] = await dashboardDB.execute(query, [username])
    if(rows.length === 0){
      return res.status(404).json({error: "Usuario no encontrado"})
    }


    // Obtendremos el valor del password ingresado, así veremos si es correcto o no.
    const user = rows[0];
    const isMatch = await bcryptjs.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({error: "Contraseña incorrecta"})
    }

    
    // Si todo está correcto, procedemos con la creación del Token
    const token = jwt.sign(
      {id: user.id, role: user.role, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    )

    res.status(200).json({
      success: "Usuario encontrado.",
      token: token,
    })

    console.log(token)

  } catch (error) {
    res.status(500).json({error: "Error en el servidor"})
  }
}
