const express = require('express')
const router = express.Router()

const Chatbox = require('../controllers/Chatbox')

router
    .get('/',Chatbox.get)
    .post('/',Chatbox.post)

module.exports = router