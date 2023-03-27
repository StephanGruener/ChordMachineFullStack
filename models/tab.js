const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tabSchema = new Schema({
    accord: {
        type: String
    },
    length: {
        type: Number
    },
    songID: {
        type: String
    },
    position: {
        type: Number
    },
    bpm: {
        type: Number    
    }
})

//TODO: Model überarbeiten
// [
//     {songname:"string"},
//     {bpm:"float"},
//     {song: [
//     {akkord: "String", Takt: "int"}
//     ]}
//     ]


const Tab = mongoose.model('Tab', tabSchema)
module.exports = Tab