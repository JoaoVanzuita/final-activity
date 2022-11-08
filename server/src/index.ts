import express from "express"
import cors from 'cors'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors());

app.get("/", async (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.listen(port, () => console.log(`Server online - Running on port ${port}`))
