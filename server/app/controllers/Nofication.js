const NoficationModel = require('../models/Nofication')

class Nofication {
    async get(req,res){
        var json = await NoficationModel.get(req.body.user)
        res.json(json)
    }
    async read(req,res){
        var json = await NoficationModel.read(req.body.user)
        res.json(json)
    }
}

module.exports = new Nofication