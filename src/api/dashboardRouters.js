import express from 'express'
import { AmountEmployeers, fiveBestPosition, totalEmployeers } from '../controllers/dashboardControllers.js'
const dashboardRouter = express.Router()

dashboardRouter.get("/amoutPerPosition", AmountEmployeers)
dashboardRouter.get("/totalEmployeers", totalEmployeers)
dashboardRouter.get("/fiveBestPositions", fiveBestPosition)

export default dashboardRouter;