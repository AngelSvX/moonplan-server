import jwt from "jsonwebtoken"

// Con este middleware, se recibirá el token del Front
// A partir de este token, si es que existe, se van a proporcionar los datos necesarios del usuario.
export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded);

    req.user = { id: decoded.id, role: decoded.role}; // Solo incluir id y role
    next();
  } catch (error) {
    console.log("Middleware: Error verificando token", error.message);
    return res.status(403).json({ message: "Token inválido." });
  }
};