const db = require('./Database')
const duser = new db('users')

class Sign {
    async log({user,pass}){
        var data = await duser.row({user})
        var error = true
        var message = ''

        if(data.length == 0){
            message = 'Tài khoản không tồn tại'
        } else if(data[0].pass != pass){
            message = 'Mật khẩu không chính xác'
        } else {
            error = false
            message = 'Đăng nhập thành công'
        } 
        return {error,message}
    }
    async reg({user,pass,rpass}){
        var data = await duser.row({user})
        var error = true
        var message = ''

        if(user == '' && pass == '' && rpass == ''){
            message = 'Không được để trống'
        } else if(pass != rpass){
            message = 'Mật khẩu xác nhận không đúng'
        } else if(user.length < 5 || pass.length < 5){
            message = 'Tài khoản hoặc Mật khẩu phải trên 5 kí tự'
        } else if(!/^[a-zA-Z0-9\\-\\_]+[a-zA-Z0-9\\-\\_]$/.test(user)){
            message = 'Tài khoản không được chứa kí tự '
        } else if(data.length > 0){
            message = 'Tài khoản đã tồn tại'
        } else {
            duser.add({user,pass,time: new Date().getTime()})
            message = "Đăng ký thành công"
            error = false
        }

        return {error,message}
    }
}

module.exports = new Sign