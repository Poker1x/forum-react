const db = require('./Database')
const dchat = new db('chats')
const duser = new db('users')

class Chatbox {
    async get(){
        var data = await dchat.all()
        data.sort((a,b) => b.id - a.id)
        return data
    }
    async post({user,content}){
        var data = await duser.row({user})
        var error = true
        var message = ''

        if(content.length < 3){
            message = 'Nội dung phải trên 3 kí tự'
        } else if(data.length == 0) {
            message = 'User không tồn tại'
        } else {
            dchat.add({
                user: JSON.stringify(data[0]),
                content,
                time: new Date().getTime()
            })
            error = false
        }

        return {error,message}
    }
}

module.exports = new Chatbox