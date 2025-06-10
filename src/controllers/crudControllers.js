import { dashboardDB } from "../models/dashboardDB.js";

export const addUser = async (req, res) => {
  try {
    const { name, flname, mlname, position, msalary } = req.body;

    // Validation
    if(!name || !flname || !mlname || !position || !msalary){
      return res.status(400).json({error: "Todos los campos deben estar rellenados."})
    }

    // My Query
    const query =
      "INSERT INTO users(name, flname, mlname, position, msalary) VALUES(?, ?, ?, ?, ?)";

    // Executing my query
    const [result] = await dashboardDB.execute(query, [
      name,
      flname,
      mlname,
      position,
      msalary,
    ]);

    // Showing my result
    console.log("Usuario añadido: ", [result]);

    // Server Responding
    res.status(201).json({
      message: "Usuario añadido satisfactoriamente",
    });
  } catch (error) {
    console.error("Ocurrió un error: ", error.message);
    res.status(500).json({
      error: "Error al añadir el usuario.",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 5;

    const offset = (page - 1) * pageSize;

    console.log(`Obteniendo usuarios: OFFSET=${offset}, pageSize=${pageSize}`);

    // Ejecutar la consulta de usuarios
    const [users] = await dashboardDB.execute(
      `SELECT * FROM users LIMIT ${pageSize} OFFSET ${offset}`
    );

    // Obtener el total de usuarios
    const [countResult] = await dashboardDB.execute(
      "SELECT COUNT(*) AS total FROM users"
    );

    const totalUsers = countResult[0].total;
    const totalPages = Math.ceil(totalUsers / pageSize);

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

export const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const { name, flname, mlname, position, msalary } = req.body;

    if(!id || !name || !flname || !mlname || !position || !msalary){
      return res.status(400).json({error: "Todos los campos deben estar llenos."})
    }

    const query = `
    UPDATE users
    SET name = ?, flname = ?, mlname = ?, position = ?, msalary = ? 
    WHERE id = ?
    `;

    const [result] = await dashboardDB.execute(query, [name, flname, mlname, position, msalary, id])

    if(result.affectedRows === 0){
      return res.status(404).json({error: "Usuario no encontrado"})
    }

    console.log([result])
    res.status(200).json({ message: "Usuario actualizado correctamente." })

  } catch (error) {
    console.error("Error al actualizar usuario: ", error)
    res.status(500).json({error: "Error interno del servidor."})
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id ;

    if(!id){
      return res.status(400).json({
        error: "No se encontró el ID del usuario."
      })
    }

    const query = "DELETE FROM users WHERE id = ?"

    const [result] = await dashboardDB.execute(query, [id])

    if(result.affectedRows === 0){
      return res.status(404).json({
        error: "Error, no se encontró al usuario."
      })
    }

    return res.status(200).json({
      message: "El usuario fue eliminado con éxito."
    })

  } catch (error) {
    res.status(501).json({
      error: "Error interno del servidor."
    })
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    
    const query = "SELECT * FROM users"

    const [result] = await dashboardDB.execute(query)

    res.status(200).json({
      message: "Petición realizada correctamente",
      result: result
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}