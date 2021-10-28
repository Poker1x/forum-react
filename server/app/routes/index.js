const Sign = require('./signup')
const Chatbox = require('./chat')
const Post = require('./post')
const Nofication = require('./nofication')

function router(app){
    app.use('/api',Sign)
    app.use('/api/chat',Chatbox)
    app.use('/api/post',Post)
    app.use('/api/nofication',Nofication)
}


module.exports = router