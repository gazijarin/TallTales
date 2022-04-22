const express = require("express")

const log = console.log

const router = express.Router();
const { ObjectID } = require('mongodb');

const { Room } = require('../models/stories.model');


// Creates a room
/*{
    "code": <String>,
    "host": <String>,
    "users" <Number>
}
*/
router.route('/create').post(async (req, res) => {
    const newRoom = new Room(req.body);

    newRoom
    .save()
    .then((result) => {
        res.send(result)
    })
    .catch(err => {
        res.status(400).json('Error: ' + err);
    });
});


// Delete room
router.route('/delete/:room').delete(async (req, res) => {
    const room = req.params.room;

    Room.findOneAndDelete({ code: room })
        .then((result) => {
            if (!result) {
                res.status(404).send('Room not found');
                return;
            }
            res.send(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});


// Make Room Private/Public
router.route('/lock/:room').post(async (req, res) => {
    const room = req.params.room;

    let curRoom = await Room.findOne({ code: room });

    // Checks to make sure it exists
    if (curRoom === null) {
        res.status(404).send('Room not found');
        return;
    }

    // Sets room to either public/private depending on what it was before
    curRoom.private = !curRoom.private;

    curRoom.save()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
})


// Make Room in Progress
router.route('/start/:room').post(async (req, res) => {
    const room = req.params.room;

    let curRoom = await Room.findOne({ code: room });

    // Checks to make sure it exists
    if (curRoom === null) {
        res.status(404).send('Room not found');
        return;
    }

    // Sets room to in progress
    curRoom.inProgress = true;

    curRoom.save()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
})


// Edits number of users in room
/*
    {
        "users": <Number>
    }
*/
router.route('/join/:room').post(async (req, res) => {
    const room = req.params.room;

    let curRoom = await Room.findOne({ code: room });

    // Checks to make sure it exists
    if (curRoom === null) {
        res.status(404).send('Room not found');
        return;
    }

    // Changes number of users by request body
    curRoom.users = req.body.users;

    curRoom.save()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
})


// Change genre for a Room
/*{
    "genre": <String>
    }
*/
router.route('/genre/:room').post(async (req, res) => {
    const room = req.params.room;

    let curRoom = await Room.findOne({ code: room });

    // Checks to make sure it exists
    if (curRoom === null) {
        res.status(404).send('Room not found');
        return;
    }

    // Sets genre to new genre
    curRoom.genre = req.body.genre;

    curRoom.save()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
})


// Get Room
router.route('/room/:room').get(async (req, res) => {
    const room = req.params.room;

    let curRoom = await Room.findOne({ code: room });

    // Checks to make sure it exists
    if (curRoom === null) {
        res.status(404).send('Room not found');
        return;
    }

    res.send(curRoom);
})


// Get All Rooms
router.route('/').get(async (req, res) => {
    const room = req.params.room;

    Room.find({
        'inProgress': false,
        'private': false
    })
    .then((rooms) => {
        res.json(rooms);
    })
    .catch(err => {
        res.status(400).json('Error: ' + err);
    });
})

module.exports = router;