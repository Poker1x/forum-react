const express = require('express')
const router = express.Router()

const Post = require('../controllers/Post')

router
    .get('/',Post.all)
    .get('/:id',Post.topic)
    .post('/',Post.add)

router
    .get('/comment/:id',Post.getComment)
    .post('/comment',Post.addComment)

router
    .get('/reply/:pid/:cid',Post.getReply)
    .post('/reply',Post.addReply)

router.post('/action',Post.action)

module.exports = router
