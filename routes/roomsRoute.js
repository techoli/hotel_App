const express = require('express')

const router = express.Router();
const Room = require('../models/rooms');

router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error })
    }

});
router.post('/getroomsbyid', async (req, res) => {

    roomid = req.body.roomid
    try {
        const room = await Room.findOne({ _id: roomid })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error })
    }

});
router.post('/createroom', async (req, res) => {
    const {
        name,
        maxcount,
        phonenumber,
        rentperday,
        imageurls,
        description,
        type
    } = req.body;
    try {
        const createroom = new Room({
            name,
            maxcount,
            phonenumber,
            rentperday,
            imageurls,
            currentbookings: [],
            description,
            type
        })
        const saveroom = await createroom.save()
        res.send('Your room is created, Your room is created')
    } catch (error) {
        return res.status(400).json({ message: error })

    }


});

module.exports = router;
