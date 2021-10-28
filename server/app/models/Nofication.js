const db = require('./Database')
const dno = new db("nofication")

class Nofication {
    async add({pid,cid,name,message}){
        var sp = cid.split('|')
        var dpost = new db(sp[0])
        var getUser = await dpost.row({id: sp[1]})
        
        dno.add({
            pid,
            message,
            time: new Date().getTime(),
            name,
            user: JSON.parse(getUser[0].user).user
        })
    }
    async get(user){
        var data = await dno.row({user})
        data = data.filter((a => a.user == user))
        data.sort((a,b) => b.id - a.id)
        return data
    }
    async read(user){
        var data = await dno.row({user})
        for(var i of data){
            dno.edit({id: i.id},{is_read: '1'})
        }
    }
}

module.exports = new Nofication