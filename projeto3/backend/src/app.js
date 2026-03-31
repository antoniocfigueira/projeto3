const express = require("express")

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const tagRoutes = require("./routes/tagRoutes")

const app = express()

app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)
app.use("/tags", tagRoutes)

app.listen(3000, () => {
  console.log("Servidor a correr em http://localhost:3000")
})