var SignModel = require('../models/Sign')

class Sign {
    async login(req,res){
        var json = await SignModel.log(req.body)
        res.json(json)
    }
    async register(req,res){
        var json = await SignModel.reg(req.body)
        res.json(json)
    }
}

module.exports = new Sign