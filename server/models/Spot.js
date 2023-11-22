var mongoose = require('mongoose')

const spotSchema = new mongoose.Schema({
    spotName: String,
    spotDescription: String,
    lat: Number,
    long: Number
})

const spotModel =  mongoose.model("skatespots", spotSchema)
module.exports = spotModel;