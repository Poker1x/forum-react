import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import { NavLink } from 'react-router-dom'

function ListPost(props) {
    let [list,setList] = useState([])

    useEffect(() => $.get('/api/post',data => setList(data)),[])

    return (
        <div class='bg-white my-2'>
            <div class='font-bold p-2 border-b-2'>Bài đăng mới</div>
            <ul class=''>
                {list.map((v,k) => (
                    <li class='border-t-2'>
                        <div class='flex items-center'>
                            <div class='mx-3 w-6 h-6 rounded-full bg-yellow-600 flex justify-center items-center font-bold text-white'>{JSON.parse(v.user).user.slice(0,1)}</div>
                            <div class=''>
                                <div class='font-bold'>{JSON.parse(v.user).user}</div>
                                <div class='text-xs'>{v.time}</div>
                            </div>
                        </div>
                        <div><NavLink to={'/post/' + v.id} class='font-bold py-1 px-4'>{v.title}</NavLink></div>
                        <div class='mx-4 mb-2 my-1 px-2 py-0 rounded bg-green-500 text-white font-bold inline-block text-sm'>{v.tag}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPost;