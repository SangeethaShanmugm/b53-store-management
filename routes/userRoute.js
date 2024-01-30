const express = require("express")
const userModel = require("../model/userModel")
const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        console.log("register", req.body)
        const newUser = new userModel({ ...req.body, verified: true })
        await newUser.save() //create a new user
        console.log(newUser)
        res.send("User registered successfully")
    } catch (error) {
        res.send({ message: "Error creating user" })
    }
})

router.post("/login", async (req, res) => {
    try {

        const user = await userModel.findOne({
            userId: req.body.userId,
            password: req.body.password,
            verified: true
        })
        if (user) {
            res.send(user)
        } else {
            res.send({ message: "Login Failed", user })
        }

    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = router