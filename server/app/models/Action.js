const db = require('./Database')
const Nofication = require('./Nofication')

const duser = new db('users')

class Action {
    async post(id,user,type,action){
        var error = true
        var message = ''
        var postID
        var ActionMessage = ''
        
        const dpost = new db(type)
        var getPost = await dpost.row({id})
        var getUser = await duser.row({user})
        
        var tym = JSON.parse(getPost[0].tym)
        var distym = JSON.parse(getPost[0].distym)
        
        if(type == 'comments' || type == 'replys'){
            var getCmt = await dpost.row({id})
            postID = getCmt[0].pid
            ActionMessage = 'bình luận'
        } else {
            postID = id
            ActionMessage = 'bài viết'
        }
        

        if(action == 'like'){
            if(tym.includes(user)){
                message = 'Bạn đã like rồi'
            } else if(distym.includes(user)){
                message = 'Bạn đã dislike rồi không thể like'
            } else {
                tym.push(user)
                dpost.edit({id},{tym: JSON.stringify(tym)})
                await Nofication.add({
                    pid: postID,
                    cid: type + '|' + id,
                    name: getUser[0].user,
                    message: `đã thích ${ActionMessage} của bạn`
                })
                error = false
            }
        } else {
            if(tym.includes(user)){
                message = 'Bạn đã like rồi không thể dislike'
            } else if(distym.includes(user)){
                message = 'Bạn đã dislike rồi'
            } else {
                distym.push(user)
                dpost.edit({id},{distym: JSON.stringify(distym)})
                await Nofication.add({
                    pid: postID,
                    cid: type + '|' + id,
                    name: getUser[0].user,
                    message: `không thích ${ActionMessage} của bạn`
                })
                error = false
            }
        }
        
        return {error,message}
    }
}
module.exports = new Action