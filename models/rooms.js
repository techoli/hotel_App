const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    maxcount: {
        type: Number,
        require: true
    },
    phonenumber: {
        type: Number,
        require: true
    },
    rentperday: {
        type: Number,
        require: true
    },
    imageurls: [],
    currentbookings: [],
    description: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
},{
    timestamps: true
})

const roomModel = mongoose.model('rooms',roomSchema);
module.exports = roomModel