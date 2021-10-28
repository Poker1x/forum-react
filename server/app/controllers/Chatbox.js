const ChatboxModel = require('../models/Chatbox')

class Chatbox {
    async get(req,res){
        var json = await ChatboxModel.get()
        res.json(json)
    }
    async post(req,res){
        var json = await ChatboxModel.post(req.body)
        res.json(json)
    }
}

module.exports = new Chatbox