import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import {NavLink} from 'react-router-dom'

function Header(props) {
    let [isOpen,setIsopen] = useState(false)
    let [alert,setAlert] = useState(0)

    useEffect(() => {
        $.post('/api/nofication',{
            user: localStorage.login
        },data => {
            data = data.filter((a => a.is_read == '0'))
            setAlert(data.length)
        })
    },[])

    // socket.on('nofi',mes => {
    //     setAlert(mes.length)
    //     console.log(mes)
    // })

    const openSidebar = () => {
        $('#sidebar').css('display',isOpen ? 'none' : 'block')
        setIsopen(!isOpen)
    }
    return (
        <div class='border-b-2 z-10 fixed w-screen flex justify-between items-center bg-white p-2 z-20'>
            <div class='flex items-center'>
                <div class='ssm:hidden ml-1 mr-3' onClick={openSidebar}><i class="far fa-bars"></i></div>
                <div class='px-2 py-1 bg-black text-white rounded font-bold'>Poker</div>
                <div class='flex items-center border-2 rounded mx-2  px-2'>
                    <input class='p-1' type='text' placeholder='Tìm kiếm ...' />
                    <i class="far fa-search"></i>
               </div>
            </div>
            <div class='flex items-center'>
                <div class='mx-3 flex items-center'>
                    <i class="far fa-bell"></i>
                    <NavLink to='/nofication'><span class='mt-2 px-1.5 py-0.5 ml-auto  font-medium tracking-wide text-red-500 bg-red-200 rounded-full text-xss'>{alert}</span></NavLink>
                </div>
                <div class='mx-3'><i class="far fa-envelope"></i></div>
                <div class='mx-3 w-6 h-6 rounded-full bg-yellow-600 flex justify-center items-center font-bold text-white'>{localStorage.login.slice(0,1)}</div>
                
            </div>
        </div>
    );
}


export default Header;