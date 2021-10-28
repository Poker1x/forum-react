const db = require('./Database')
const dpost = new db('posts')
const duser = new db('users')

class Post {
    async all(){
        var data = await dpost.all()
        return data
    }
    async topic(id){
        var data = await dpost.row({id})
        return data[0]
    }
    async add({title,content,user,tag}){
        var data = await duser.row({user})
        var error = true
        var message = ''

        if(title.length < 10){
            message = 'Tiêu đề phải trên 10 kí tự'
        } else if(content.length < 10){
            message = 'Nội dung phải trên 10 kí tự'
        } else if(data.length == 0) {
            message = 'User không tồn tại'
        } else {
            dpost.add({
                user: JSON.stringify(data[0]),
                title,
                content,
                tag,
                time: new Date().getTime()
            })
            error = false
        }

        return {error,message}
    }
}

module.exports = new Post