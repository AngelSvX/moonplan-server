import dotenv from "dotenv";
import { create, enter } from "../services/auth.service.js";

dotenv.config();

// Se crea un usuario el cual será el admin (Ya no se usará esta función)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const result = await create({ username, email, password, role });

    console.log("Usuario creado con éxito:", result);

    res.status(201).json({
      message: "Usuario creado con éxito",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Error al crear usuario:", err.message);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Se verifica que el usuario exista y se le genera el Token.
export const enterUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Faltan credenciales." });
    }

    const result = await enter({ name, password });

    if (!result.found) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (!result.isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    console.log(result.user)

    res.status(200).json({
      success: "Usuario autenticado correctamente.",
      token: result.token,
    });
  } catch (error) {
    console.error("❌ Error en autenticación:", error);
    res.status(500).json({ error: "Error en el servidor." });
  }
};
