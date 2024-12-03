
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();


const server = http.createServer(app);
const io = new Server(server);


//socket io

io.on('connection', (socket) => {
    // console.log("A new user Joined the server", socket.id)
    socket.on('user-message', (message) => {
        console.log("A new message was sent", message)
        io.emit('message', message);
    })
});

app.use(express.static(path.resolve('./public')));

app.get("/", (req, res) => {
    return res.sendFile("index.html");
})
server.listen(3000, () => {
    console.log("server listening on port 3000")
})

