import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import { socket } from '../../../store'

import Reply from './Reply'

function Comment({ puser,id }) {
    let [list, setList] = useState([])
    let [comment, setComment] = useState('')

    const click = () => {
        $.post('/api/post/comment', {
            id,
            user: localStorage.login,
            content: comment
        }, data => {
            if (data.error) alert(data.message)
            else {
                setComment('')
                getList()
                socket.emit('nofi',{
                    name: localStorage.login,
                    user: puser,
                    message: 'Đã bình luận bài viết của bạn'
                })
            }
        })
    }
    useEffect(() => getList(),[])

    const getList = () => {
        $.get('/api/post/comment/' + id, data => {
            setList(data)
        })
    }
    return (
        <div >
            <div class='px-4 py-2 text-lg font-bold'>Bình luận <span class='text-lg text-yellow-600'>{list.length}</span></div>
            <div class='flex items-center border-t-2 border-b-2 p-2 mt-2'>
                <input value={comment} onChange={e => setComment(e.target.value)} type='text' placeholder='Nhập bình luận ...' />
                <button onClick={click} class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Gửi</button>
            </div>
            <div class=''>
                {list.map((v, k) => (
                    <List key={k} pid={id} {...v} />
                ))}
            </div>

        </div>
    );
}


function List({pid, id, user, content, time ,tym,distym}) {
    let [hash, setHash] = useState('')
    let [like,setLike] = useState(JSON.parse(tym).length)
    let [dislike,setDislike] = useState(JSON.parse(distym).length)

    const changeUrl = () => {
        setHash('#' + JSON.parse(user).user + '|' + id)
    }

    const likeAction = () => {
        $.post('/api/post/action',{
            id,
            user: localStorage.login,
            type: 'comments',
            action: 'like'
        },data => {
            if(data.error) alert(data.message)
            else setLike(like + 1)
        })
    }

    const dislikeAction = () => {
        $.post('/api/post/action',{
            id,
            user: localStorage.login,
            type: 'comments',
            action: 'dislike'
        },data => {
            if(data.error) alert(data.message)
            else setDislike(dislike + 1)
        })
    }

    return (
        <div>
            <div class='flex border-t-2 p-2'>
                <div class='mx-3 w-10 h-8 rounded-full bg-yellow-600 flex justify-center items-center font-bold text-white'>{JSON.parse(user).user.slice(0, 1)}</div>
                <div class='w-full'>
                    <div class='flex items-center'>
                        <div class='font-bold mr-2'>{JSON.parse(user).user}</div> - <div class='text-sm mx-2'>{time}</div>
                    </div>
                    <div class='p-2 rounded bg-gray-300'>
                        <div class='mt-2'>{content}</div>
                        <div class='flex justify-between mt-3'>
                            <div class='text-sm font-semibold' onClick={changeUrl}>Trả lời</div>
                            <div class='flex'>
                                <div class='mx-2' onClick={likeAction}><i class="text-sm far fa-thumbs-up"></i><span class='text-sm font-semibold ml-1'>{like}</span></div>
                                <div class='mx-2' onClick={dislikeAction}><i class="text-sm far fa-thumbs-down"></i><span class='text-sm font-semibold ml-1'>{dislike}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div class=''>
                <Reply pid={pid} cid={id} chash={hash} />
            </div>
        </div>
    )
}



export default Comment;