import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { dashboardDB } from "../models/dashboardDB.js";

const create = async ({ username, email, password, role }) => {
  const hashedPassword = await bcryptjs.hash(password, 10);

  const query =
    "INSERT INTO usercredentials(username, email, password, role) VALUES(?,?,?,?)";
  const [result] = await dashboardDB.execute(query, [
    username,
    email,
    hashedPassword,
    role,
  ]);

  return result;
};

const enter = async ({ name, password }) => {
  // Detectaremos si el usuario existe mediante el usuario
  const query = "SELECT name, flname, mlname, roleName, salary, email, password FROM usuarios u INNER JOIN roles r ON u.rol_id = r.id WHERE name = ?";
  const [rows] = await dashboardDB.execute(query, [name]);

  // Obtendremos el valor del password ingresado, así veremos si es correcto o no.
  const user = rows[0];

  if (!user) {
    return {
      isMatch: false,
      token: null,
      user: null,
      found: false,
    };
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  // Si todo está correcto, procedemos con la creación del Token
  const token = jwt.sign(
    { id: user.id, role: user.roleName, email: user.email, name: user.name  },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, isMatch, token, found: true };
};

export { create, enter };
