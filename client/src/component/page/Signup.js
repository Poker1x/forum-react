import React, { useState } from 'react';
import $ from 'jquery'

function Signup(props) {
    let [is,setIs] = useState(true)

    const handelChange = () => setIs(!is)
    return (
        <div>
            {is ? <Login change={handelChange} /> : <Register change={handelChange} /> }
        </div>
    );
}

function Login({change}){
    let [user,setUser] = useState('')
    let [pass,setPass] = useState('')
   
    const click = () => {
        $.post("/api/login",{
            user,pass
        },data => {
            if(data.error) alert(data.message)
            else {
                alert(data.message)
                localStorage.login = user
                window.location.reload()
            }
        })
    }
    return (
        <div class='fixed flex justify-center items-center top-0 left-0 w-full h-full bg-red-400'>
            <div class='bg-white w-5/6'>
                <div class='p-3 font-bold border-b-2'>Đăng nhập</div>
                <div class='p-3'>
                    <input class='border-2 my-1' type='text' onChange={e => setUser(e.target.value)} placeholder='Tên đăng nhập ...' />
                    <input class='border-2 my-1' type='text' onChange={e => setPass(e.target.value)} placeholder='Mật khẩu ...' />
                    <div class='flex justify-between items-center p-3'>
                        <button onClick={click} class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Đăng nhập</button>
                        <div onClick={change} class='ml-4'>Bạn chưa có tài khoản ??</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Register({change}){
    let [user,setUser] = useState('')
    let [pass,setPass] = useState('')
    let [rpass,setRpass] = useState('')

    const click = () => {
        $.post("/api/register",{
            user,pass,rpass
        },data => {
            if(data.error) alert(data.message)
            else {
                alert(data.message)
                localStorage.login = user
                window.location.reload()
            }
        })
    }
    return (
        <div class='fixed flex justify-center items-center top-0 left-0 w-full h-full bg-red-400'>
            <div class='bg-white w-5/6'>
                <div class='p-3 font-bold border-b-2'>Đăng ký</div>
                <div class='p-3'>
                    <input class='border-2 my-1' type='text' onChange={e => setUser(e.target.value)} placeholder='Tên đăng nhập ...' />
                    <input class='border-2 my-1' type='text' onChange={e => setPass(e.target.value)} placeholder='Mật khẩu ...' />
                    <input class='border-2 my-1'type='text' onChange={e => setRpass(e.target.value)} placeholder='Nhập lại mật khẩu ...' />
                    <div class='flex justify-between items-center p-3'>
                        <button onClick={click} class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Đăng ký</button>
                        <div onClick={change}>Bạn đã có tài khoản ??</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;