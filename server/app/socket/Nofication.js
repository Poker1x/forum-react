function Nofication(io,socket){
    const data = []

    socket.on('nofi',mes => {
        data.push(mes)
        io.emit('nofi',data)
    })
}

module.exports = Nofication