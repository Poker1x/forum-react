const express = require('express')
const http = require('http')

var bodyParser = require('body-parser')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.static("public"))
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ 
  extended: true
}))

const router = require('./app/routes')
const socket = require('./app/socket')

router(app)
socket(io)

server.listen(2000, function(){
    console.log('listening on *:2000')
});
