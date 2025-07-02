import bcrypt from "bcryptjs";
import { dashboardDB } from "../models/dashboardDB.js";

const addUser = async ({
  name,
  flname,
  mlname,
  rol_id,
  salary,
  email,
  password,
}) => {
  try {

    if (!name || !flname || !mlname || !rol_id || !salary || !email || !password) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const [existingUsers] = await dashboardDB.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      throw new Error("El correo o nombre de usuario ya está registrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO usuarios 
      (name, flname, mlname, rol_id, salary, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await dashboardDB.execute(insertUserQuery, [
      name,
      flname,
      mlname,
      rol_id,
      salary,
      email,
      hashedPassword,
    ]);

    console.log("Usuario añadido correctamente:", result.insertId);
    return { userId: result.insertId };

  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    throw error;
  }
};

const getUser = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;

  const [users] = await dashboardDB.execute(
    `SELECT * FROM usuarios LIMIT ${pageSize} OFFSET ${offset}`
  );

  const [countResult] = await dashboardDB.execute(
    "SELECT COUNT(*) AS total FROM usuarios"
  );

  const totalUsers = countResult[0].total;
  const totalPages = Math.ceil(totalUsers / pageSize);

  return { users, page, totalPages };
};

const updateUser = async (
  id,
  { name, flname, mlname, rol_id, salary, email, password }
) => {
  if (
    !id ||
    !name ||
    !flname ||
    !mlname ||
    !rol_id ||
    !salary ||
    !email ||
    !password
  ) {
    throw new Error("Todos los campos deben estar llenos.");
  }

  // Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    UPDATE usuarios
    SET name = ?, flname = ?, mlname = ?, rol_id = ?, salary = ?, email = ?, password = ?
    WHERE id = ?
  `;

  const [result] = await dashboardDB.execute(query, [
    name,
    flname,
    mlname,
    rol_id,
    salary,
    email,
    hashedPassword,
    id,
  ]);

  return result;
};

const deleteUser = async (id) => {
  const query = "DELETE FROM usuarios WHERE id = ?";
  const [result] = await dashboardDB.execute(query, [id]);
  return result;
};

const getTotalUser = async () => {
  const query = "SELECT * FROM usuarios";
  const [result] = await dashboardDB.execute(query);
  return result;
};

export { addUser, getUser, updateUser, deleteUser, getTotalUser };
