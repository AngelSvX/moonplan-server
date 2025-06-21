import express from 'express'
import {addUsers, deleteUsers, getTotalUsers, getUsers, updateUsers } from '../controllers/crudControllers.js'

const crudRouter = express.Router()

crudRouter.get("/getUsers", getUsers)
crudRouter.post("/addUser", addUsers)
crudRouter.delete("/deleteUser/:id", deleteUsers)
crudRouter.put("/updateUser/:id", updateUsers)
crudRouter.get("/getTotalUsers", getTotalUsers)

export default crudRouter;