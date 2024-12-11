// Client (HTTP or WebSocket Request)
//        |
//        v
// +----------------+
// |  HTTP Server   | (Handles HTTP & WebSocket connections)
// +----------------+
//        |                     \
//        v                      v
// +-------------+      +-------------------+
// |  Express    |      |  Socket.IO        |
// | (HTTP APIs) |      | (Real-time comm)  |
// +-------------+      +-------------------+

import {Server} from "socket.io"
import http from "http"
import express from "express"

const app=express();
const server=http.createServer(app);

// socket server creation
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    },
});

const OnlineUsersIds=[];
io.on("connection",(socket)=>{
    console.log("Connected successfully!",socket.id);

    // storing this user as online users if it connects in OnlineUsersIds
    const UserId = socket.handshake.query.UserId;
    if(UserId) {
        OnlineUsersIds[UserId]=socket.id;
    }

    // broadcasting the keys/indexes of OnlineUsersIds to all online users
    io.emit("ObjectofOnlineUsersIds",Object.keys(OnlineUsersIds));
    console.log(Object.keys(OnlineUsersIds));


    socket.on("disconnect",()=>{
        console.log("Disconnected!",socket.id);
        // if the user is disconnected then removed from the OnlineUsersIds
        delete OnlineUsersIds[UserId];
        io.emit("ObjectofOnlineUsersIds",Object.keys(OnlineUsersIds));
    })

})

// fun to get the socketId
const getSocketId= (UserId) =>{
    return OnlineUsersIds[UserId];
}



export {io,app,server,getSocketId};