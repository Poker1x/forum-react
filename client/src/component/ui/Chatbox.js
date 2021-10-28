import React, { useEffect, useState } from 'react';

import $ from 'jquery'
import NickColor from './user/NickColor'
import { socket } from '../../store'


function Chatbox(props) {
    let [content,setContent] = useState('')
    let [list,setList] = useState([])

    useEffect(() => $.get('/api/chat',data => setList(data)),[])
    const click = () => {
        socket.on('chat',data => setList(data))
        socket.emit('chat',{
            user: localStorage.login,
            content
        },data => {
            if(data.error) alert(data.message)
            else {
                setContent('')
                $('#chat-box ul').scrollTop(0)
            }
        })
    }

    return (
        <div id='chat-box' class='bg-white mt-2'>
            <div class='border-b-2 p-2 font-bold'>Chatbox</div>
            <ul class='h-96 overflow-y-scroll'>
                {list.map((v,k) => (
                    <li key={v.id} class='p-2 border-t-2'>
                      <NickColor {...JSON.parse(v.user)} /> : <span class=''>{v.content}</span>
                    </li>
                ))}
            </ul>
            <div class='border-t-2 flex justify-center items-center'>
                <input onKeyDown={e => e.key === 'Enter' && click()}value={content} onChange={e => setContent(e.target.value)} type='text' placeholder='Nhập nội dung ...' />
                <button onClick={click} class='px-5 border-l-2 font-bold'>Chat</button>
            </div>
        </div>
    );
}

export default Chatbox;