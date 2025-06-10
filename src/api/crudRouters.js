import express from 'express'
import {addUser, deleteUser, getTotalUsers, getUser, updateUser } from '../controllers/crudControllers.js'

const crudRouter = express.Router()

crudRouter.get("/getUsers", getUser)
crudRouter.post("/addUser", addUser)
crudRouter.delete("/deleteUser/:id", deleteUser)
crudRouter.put("/updateUser/:id", updateUser)
crudRouter.get("/getTotalUsers", getTotalUsers)

export default crudRouter;