import { dashboardDB } from "../models/dashboardDB.js"

export const AmountEmployeers =  async (req, res) => {
  try {
    const consult = `
      SELECT position,
      COUNT(*) as cantidad
      FROM users
      GROUP BY position;
    `

    const [result] = await dashboardDB.execute(consult)

    console.log([result])

    res.status(200).json({
      response: "Data traída con éxito",
      result: result
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
}

export const totalEmployeers = async (req, res) => {
  try {

    const query = "SELECT COUNT(position) as cantidad FROM users;"

    const [result] = await dashboardDB.execute(query)

    const totalData = result[0]

    res.status(200).json({
      response: "Data traída con éxito",
      result: totalData
    })
  } catch (error) {
    res.status(500).json({
      error: "Ocurrió un error"
    })
  }
}

export const fiveBestPosition = async (req, res) => {
  try {
    const query = `
      SELECT position ,COUNT(position)
      AS cantidad
      FROM users
      GROUP BY(position)
      ORDER BY cantidad DESC
      LIMIT 5;
    `

    const [result] = await dashboardDB.execute(query)

    const totalResult = result

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