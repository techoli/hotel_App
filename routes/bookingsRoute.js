const express = require('express')

const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/rooms')
const stripe = require('stripe')('sk_test_51LBPQCFhDUXuUphXczr1VDWGMDHL8Na2V1Kyu0HbSnOXz3OZfPjNAHShIrN16J0NSX85oPGhd5G39HDIcw9dNPr600tpSc9l80')
const { v4: uuidv4 } = require('uuid');

router.post('/bookroom', async (req, res) => {

    const {
        room,
        userid,
        checkin,
        checkout,
        totalamount,
        totaldays,
        token
    } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create(

            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'usd',
                receipt_email: token.email
            }, {
            idempotencyKey: uuidv4()
        }
        )
        if (payment) {


            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: checkin,
                todate: checkout,
                totalamount,
                totaldays,
                transactionid: '1234'
            })
            const savebooking = await newbooking.save()

            const roomtep = await Room.findOne({ _id: room._id })
            roomtep.currentbookings.push({ bookingid: savebooking._id, fromdate: checkin, todate: checkout, userid: userid, status: savebooking.status });
            await roomtep.save();


        }
        res.send('Paymet Successful, Your room is booked')
    } catch (error) {
        return res.status(400).json({ message: error })

    }




});
router.post('/mybookings', async (req, res) => {
    const userid = req.body.userid
    try {
        const booking = await Booking.find({userid:userid})
        res.send(booking)

    } catch (error) {
        return res.status(400).json({ error })
    }

});
router.post('/cancel', async (req, res) => {
    const {bookingid,roomid} = req.body
    try {
        const cancel = await Booking.findOne({_id:bookingid})
        cancel.status = 'cancel'
        await cancel.save()
        const cancelroom = await Room.findOne({_id:roomid})
        const rebooking = cancelroom.currentbookings
        const temp = rebooking.filter(rebook => rebook.bookingid.toString()!==bookingid)
        cancelroom.currentbookings = temp
        await cancelroom.save()
        res.send('Your room Cancelled')

    } catch (error) {
        return res.status(400).json({ error })
    }

});
router.get('/allbookings', async(req, res) => {
    try {
        const allbooks = await Booking.find({})
         res.send(allbooks)
    } catch (error) {
        return res.status(400).json({message: error})
    }
    
});
module.exports = router;