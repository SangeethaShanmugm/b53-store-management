const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoute")
const itemRoute = require("./routes/itemsRoute")
const billRoute = require("./routes/billRoute")


const app = express()
const PORT = 4000
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Welcome to Store management')
})


app.use("/users", userRoute)
app.use("/items", itemRoute)
app.use("/bills", billRoute)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongoose is connected")
        app.listen(PORT, () => console.log("Server started on the port", PORT))
    })
    .catch((error) => {
        console.log("Error", error)
    })

