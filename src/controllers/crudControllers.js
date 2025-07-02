import { dashboardDB } from "../models/dashboardDB.js";
import {
  addUser,
  deleteUser,
  getTotalUser,
  getUser,
  updateUser,
} from "../services/user.service.js";

export const addUsers = async (req, res) => {
  try {
    const { name, flname, mlname, rol_id, salary, email, password } = req.body;
    await addUser({ name, flname, mlname, rol_id, salary, email, password });

    if (
      !name ||
      !flname ||
      !mlname ||
      !rol_id ||
      !salary ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos deben estar rellenados." });
    }

    res.status(201).json({ message: "Usuario añadido satisfactoriamente" });
  } catch (error) {
    console.error("Ocurrió un error: ", error.message, error);
    res.status(500).json({ error: "Error al añadir el usuario." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 5;

    const { users, totalPages } = await getUser(page, pageSize);

    res.status(200).json({
      page,
      message: "Petición de lectura completada",
      users,
      totalPages,
    });
  } catch (error) {
    console.error("❌ Error al obtener los usuarios: ", error);
    res.status(500).json({
      error: "Error al obtener los usuarios.",
    });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, flname, mlname, rol_id, salary, email, password } = req.body;

    const result = await updateUser(id, {
      name,
      flname,
      mlname,
      rol_id,
      salary,
      email,
      password,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado correctamente." });
  } catch (error) {
    console.error("Error al actualizar usuario: ", error.message);
    res.status(500).json({ error: error.message || "Error interno del servidor." });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);

    if (!id) {
      return res.status(400).json({
        error: "No se encontró el ID del usuario.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Error, no se encontró al usuario.",
      });
    }

    return res.status(200).json({
      message: "El usuario fue eliminado con éxito.",
      result: result,
    });
  } catch (error) {
    res.status(501).json({
      error: "Error interno del servidor.",
    });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const result = await getTotalUser();

    res.status(200).json({
      message: "Petición realizada correctamente",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
