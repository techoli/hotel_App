const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        require: true
    },
    roomid: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    fromdate: {
        type: String,
        require: true
    },
    todate: {
        type: String,
        require: true
    },
    totalamount: {
        type: Number,
        require: true
    },
    totaldays: {
        type: Number,
        require: true
    },
    transactionid: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "booked"
    },
},{
    timestamps: true
})

const bookingModel = mongoose.model('booking',bookingSchema);
module.exports = bookingModel