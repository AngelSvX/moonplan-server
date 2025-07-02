import { dashboardDB } from "../models/dashboardDB.js";

const getAmountEmployeers = async () => {
  const query = `
    SELECT r.roleName AS position, COUNT(u.rol_id) AS cantidad
    FROM usuarios u
    JOIN roles r ON u.rol_id = r.id
    GROUP BY r.roleName;
  `;

  const [result] = await dashboardDB.execute(query);
  return result;
};

const getTotalEmployeers = async () => {
  const query = "SELECT COUNT(*) AS cantidad FROM usuarios;";
  const [result] = await dashboardDB.execute(query);
  return result[0];
};

const getFiveBestPosition = async () => {
  const query = `
    SELECT r.roleName AS position, COUNT(u.rol_id) AS cantidad
    FROM usuarios u
    JOIN roles r ON u.rol_id = r.id
    GROUP BY r.roleName
    ORDER BY cantidad DESC
    LIMIT 5;
  `;

  const [result] = await dashboardDB.execute(query);
  return result;
};

export { getAmountEmployeers, getTotalEmployeers, getFiveBestPosition };
