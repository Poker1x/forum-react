const PoatModel = require('../models/Post')
const CommentModel = require('../models/Comment')
const ActionModel = require('../models/Action')


class Post {
    async all(req, res) {
        var json = await PoatModel.all()
        res.json(json)
    }
    async topic(req, res) {
        var json = await PoatModel.topic(req.params.id)
        res.json(json)
    }
    async add(req, res) {
        var json = await PoatModel.add(req.body)
        res.json(json)
    }
    async action(req,res){
        var json = await ActionModel.post(req.body.id,req.body.user,req.body.type,req.body.action)
        res.json(json)
    }
    async addComment(req, res) {
        var { user,content } = req.body
        var json = await CommentModel.add(req.body.id,user,content)
        res.json(json)
    }
    async getComment(req,res){
        var json = await CommentModel.get(req.params.id)
        return res.json(json)
    }
    async addReply(req,res){
        var { pid,cid,user,name,content } = req.body
        var json = await CommentModel.addReply(pid,cid,user,name,content)
        res.json(json)
    }
    async getReply(req,res){
        var json = await CommentModel.getReply(req.params.pid,req.params.cid)
        return res.json(json)
    }
    
}

module.exports = new Post