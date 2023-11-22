const express = require('express')
var mongoose = require('mongoose')
const User = require('./models/User')
const Spot = require('./models/Spot')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = require('./userAuth')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// app.get('/home', async (req, res) => {
//     try {
//         const data = await Spot.find()
//         res.json(data)
//     } catch (err) {
//         console.error(err)
//     }
// })

// app.post('/login', async (req, res) => {
//     User.findOne({email: req.body.email})
//     .then(async user => {
//         if (user) {
//             try {
//                 if (bcrypt.compare(req.body.password, user.password)) {
//                     const token = jwt.sign({ name: user.name, email: user.email, userId: user._id }, process.env.JWT_SECRET);
//                     res.json({ token });
//                 } else {
//                     res.json("The password is incorrect")
//                 }
//             } catch (err) {
//                 console.log(err)
//             }
//         } else {
//             res.json("No account exists")
//         }
//     })
// })

// app.post('/register', async (req, res) => {
//     const {name, email, password} = req.body
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10)
//         User.create({name, email, password: hashedPassword})
//         .then(employees => res.json(employees))
//         .catch(err => res.json(err))
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.post('/submit', async (req, res) => {
//     const {spotName, spotDescription, lat, long} = req.body
//     try {
//         Spot.create({spotName, spotDescription, lat, long})
//         .then(spots => res.json(spots))
//         .catch(err => res.json(err))
//     } catch (err) {
//         console.log(err)
//     }
// })

// app.get('/submit', verifyToken, (req, res) => {
//     res.json("You have been logged in!")
// })

app.listen(3001, () =>{
    console.log("server is running")
})