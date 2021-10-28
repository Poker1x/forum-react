const Chatbox = require('./Chatbox')
const Nofication = require('./Nofication')

function socket(io) {
    io.on("connection", function (socket) {
        console.log(socket.id + 'Connected')
        socket.on("disconnect", () => console.log(socket.id + 'Disconnected'))

        Chatbox(io,socket)
        Nofication(io,socket)
    });
}

module.exports = socket