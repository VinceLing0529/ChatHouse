const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String ,
        required: [
            true,
            "Room {PATH} is required"
        ],
        minlength: [3, "Room {PATH} must be at least {MINLENGTH} characters."]

    },
    host: { type: String ,
        required: [
            true,
            "Room {PATH} is required"
        ],
        minlength: [3, "Room {PATH} must be at least {MINLENGTH} characters."]
    },
    time:{type:String,
        required: [
            true,
            "Duration is required"
        ],
    },
    description: { type: String},

}, { timestamps: true });

module.exports.Room = mongoose.model('Room', RoomSchema);

