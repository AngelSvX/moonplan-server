import { dashboardDB } from "../models/dashboardDB.js";

const addUser = async ({ name, flname, mlname, position, msalary }) => {
  const query =
    "INSERT INTO users(name, flname, mlname, position, msalary) VALUES(?, ?, ?, ?, ?)";

  const [result] = await dashboardDB.execute(query, [
    name,
    flname,
    mlname,
    position,
    msalary,
  ]);

  console.log("Usuario añadido: ", [result]);
};

const getUser = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;

  const [users] = await dashboardDB.execute(
    `SELECT * FROM users LIMIT ${pageSize} OFFSET ${offset}`
  );

  const [countResult] = await dashboardDB.execute(
    "SELECT COUNT(*) AS total FROM users"
  );

  const totalUsers = countResult[0].total;
  const totalPages = Math.ceil(totalUsers / pageSize);

  return { users, page, totalPages };
};

const updateUser = async (id, { name, flname, mlname, position, msalary }) => {
  const query = `
    UPDATE users
    SET name = ?, flname = ?, mlname = ?, position = ?, msalary = ? 
    WHERE id = ?
    `;

  const [result] = await dashboardDB.execute(query, [
    name,
    flname,
    mlname,
    position,
    msalary,
    id,
  ]);
  return result;
};

const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await dashboardDB.execute(query, [id]);
  return result;
};

const getTotalUser = async () => {
  const query = "SELECT * FROM users";
  const [result] = await dashboardDB.execute(query);
  return result;
};

export { addUser, getUser, updateUser, deleteUser, getTotalUser };
