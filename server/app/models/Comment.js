const db = require('./Database')
const Nofication = require('./Nofication')

const dcmt = new db('comments')
const dreply = new db('replys')
const duser = new db('users')


class Comment {
    async add(id,user,content){
        var getUser = await duser.row({user})
        
        var error = true
        var message = ''

        if(content.length < 3){
            message = 'Nội dung phải trên 3 kí tự'
        } else if(getUser.length == 0) {
            message = 'User không tồn tại'
        } else {
            dcmt.add({
                user: JSON.stringify(getUser[0]),
                pid: id,
                content,
                time: new Date().getTime()
            })
            
            await Nofication.add({
                pid: id,
                cid: 'posts|' + id,
                name: getUser[0].user,
                message: 'đã bình luận bài viết của bạn'
            })
            error = false
        }

        return {error,message}
    }
    async get(id){
        var data = await dcmt.row({pid:id})
        return data
    }

    async addReply(pid,cid,user,name,content){
        var getUser = await duser.row({user})
        var error = true
        var message = ''

        if(content.length < 3){
            message = 'Nội dung phải trên 3 kí tự'
        } else if(getUser.length == 0) {
            message = 'User không tồn tại'
        } else {
            dreply.add({
                user: JSON.stringify(getUser[0]),
                name: name.slice(1,user.length + 1),
                pid,
                cid,
                content,
                time: new Date().getTime()
            })
            await Nofication.add({
                pid,
                cid: 'comments|' + cid,
                name: getUser[0].user,
                message: 'đã trả lời bình luận của bạn'
            })
            error = false
        }

        return {error,message}
    }
    async getReply(pid,cid){
        var data = await dreply.row({pid,cid})
        return data
    }
}

module.exports = new Comment