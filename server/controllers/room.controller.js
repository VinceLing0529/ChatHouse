const { Room } = require('../models/room.model');

    // The method below is new
module.exports.createRoom = (request, response) => {
    const { name, host,time,description} = request.body;
    Room.create({
        name,
        host,
        time,
        description
    })
        .then(person => response.json(person))
        .catch((err) => {
            response.status(400).json(err);
          });

}

module.exports.getAllRooms = (request, response) => {
    Room.find({})
        .then(persons => response.json(persons))
        .catch(err => response.json(err))
}

module.exports.getRoom = (request, response) => {
    Room.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err))
}

module.exports.SearchRoom = (request, response) => {
    Room.find({name:request.params.name})
        .then(person => response.json(person))
        .catch(err => response.json(err))
}



module.exports.deleteRoom = (request, response) => {
    Room.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}