const express = require('express')
const router = express.Router()

const Sign = require('../controllers/Sign')

router.post('/login',Sign.login)
router.post('/register',Sign.register)

module.exports = router