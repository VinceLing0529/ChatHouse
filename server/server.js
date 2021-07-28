const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config');
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
require('./routes/room.routes')(app);
var router = express.Router();
const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);
const io = require('socket.io')(server, { cors: true });
var roomInfo = {};

io.on('connection', function (socket) {

  // http://localhost:3000/room/room_1, roomID = room_1
  
  socket.on('join', function (userName,roomId) {
    user = userName;
    roomID= roomId;
    // adding username to list
    if (!roomInfo[roomID]) {
      roomInfo[roomID] = [];
    }
    roomInfo[roomID].push(user);
    
    socket.join(roomID);    // Join room
    // annose
    io.to(roomID).emit('sys', user + 'Joined Room', roomInfo[roomID]);  
    console.log(user + 'Join' + roomID);
  });

  // socket.on('leave', function () {
  //   socket.emit('disconnectt');
  // });

  // socket.on('disconnectt', function () {
  //   var index = roomInfo[roomID].indexOf(user);
  //   if (index !== -1) {
  //     roomInfo[roomID].splice(index, 1);
  //   }
  //   socket.leave(roomID);    // 退出房间
  //   io.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
  //   console.log(user + '退出了' + roomID);
  // });

  // 接收用户消息,发送相应的房间
  socket.on('message', function (msg) {
    // 验证如果用户不在房间内则不给发送
    if (roomInfo[roomID].indexOf(user) === -1) {  
      console.log("false")
      return false;
    }
    io.to(roomID).emit('msg', user, msg);
  });


  socket.on('message', function (msg) {
    // if user not in room 
    if (roomInfo[roomID].indexOf(user) === -1) {  
        console.log("xxx")
      return false;
    }
    console.log(user+"said"+msg)
    io.to(roomID).emit('msg', user, msg);
  });



});
