const express = require("express");
const path = require("path");
const { Socket } = require("socket.io");

const app = express();
const server = require("http").createServer(app);

const io  = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username, id){
        socket.broadcast.emit("update", {text:username + " joined the conversation", serverId: id});
    });
    socket.on("exituser", function(username, id){
        socket.broadcast.emit("update", {text:username + " left the conversation", serverId: id});
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});


const port = 4856;
server.listen(port, '0.0.0.0');