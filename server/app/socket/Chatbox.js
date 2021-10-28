const db = require('../models/Database')
const dchat = new db('chats')
const ChatboxModel = require('../models/Chatbox')


module.exports = (io,socket) => {
    var list = []
    socket.on('chat',async (mes,cb) => {
        var json = await ChatboxModel.post({
            user: mes.user,
            content: mes.content
        })
        cb(json)
        var data = await ChatboxModel.get()
        io.emit('chat',data)
    })
}