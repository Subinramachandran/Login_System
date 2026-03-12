const jwt = require('jsonwebtoken')
const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(cookieParser())

const SECRET_KEY = process.env.SECRET_KEY

const verifyToken = (req, res, next) => {
    const token = req.cookies.token //read token from cookie
    console.log("Cookies: ", req.cookies)
    if (!token) {
        return res.status(401).json({
            message: "No token found"
        })
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log("JWT ERROR", error.message)

        return res.status(401).json({
            message: 'Invalid token'
        })
    }

}

module.exports = verifyToken