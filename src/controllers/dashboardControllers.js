import { dashboardDB } from "../models/dashboardDB.js"
import { getAmountEmployeers, getFiveBestPosition, getTotalEmployeers } from "../services/dashboard.service.js"

export const AmountEmployeers =  async (req, res) => {
  try {

    const response = await getAmountEmployeers()

    console.log([response])

    res.status(200).json({
      response: "Data traída con éxito",
      result: response
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

export const totalEmployeers = async (req, res) => {
  try {

    const response = await getTotalEmployeers()

    res.status(200).json({
      response: "Data traída con éxito",
      result: response
    })
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error"
    })
  }
}

export const fiveBestPosition = async (req, res) => {
  try {

    const totalResult = await getFiveBestPosition()

    res.status(200).json({
      response: "Data traída exitosamente",
      result: totalResult
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}