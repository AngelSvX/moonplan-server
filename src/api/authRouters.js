import express from 'express'
import {createUser, enterUser} from '../controllers/authControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Estas son las Rutas HTTP
authRouter.post("/createUserCredentials", createUser)
authRouter.post("/enterUserCredentials", enterUser)

// Esta ruta usa un middleware, que es como un filtro, si pasa ese filtro, devolverá una respuesta.
authRouter.get("/user/profile", authMiddleware, (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  })
})
// Una ruta HTTP puede tener tantos middleware como sean necesarios.

export default authRouter;