const RoomController = require('../controllers/room.controller');
module.exports = function(app){
    app.post('/api/room', RoomController.createRoom);
    app.get('/api/room', RoomController.getAllRooms);
    app.get('/api/room/:id', RoomController.getRoom);
    app.get('/api/search/:name', RoomController.SearchRoom);
    app.delete('/api/room/:id', RoomController.deleteRoom);

}