import express from 'express'
import cors from 'cors'
import gameRoutes from './routes/game.js'

const app = express()

app.use(cors())

gameRoutes(app)

app.listen(5000, () => {
    console.log("server is running on port 5000")
})