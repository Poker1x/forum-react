const express = require('express')
const router = express.Router()

const Nofication = require('../controllers/Nofication')

router.post('/',Nofication.get)
router.post('/read',Nofication.read)

module.exports = router