import React, { useState, useEffect } from 'react';
import $ from 'jquery'

function Reply({ pid, cid, chash }) {

    let [hash, setHash] = useState('')
    let [comment, setComment] = useState('')
    let [list, setList] = useState([])

    const click = () => {
        $.post('/api/post/reply', {
            pid,
            cid,
            user: localStorage.login,
            name: hash.split('|')[0],
            content: comment
        }, data => {
            if (data.error) alert(data.message)
            else {
                setComment('')
                setHash('')
                getList()
            }
        })
    }

    useEffect(() => getList(), [])

    const getList = () => {
        $.get('/api/post/reply/' + pid + '/' + cid, data => {
            setList(data)
        })
    }

    const handleHash = h => {
        setHash(h)
    }
    return (
        <div class='ml-20'>
            <div class=''>
                {list.map((v, k) => (
                    <List key={k} pid={pid} {...v} onsetHash={handleHash} />
                ))}
            </div>
            {(chash != '' || hash != '') && (
                <div class='mt-2'>
                    {hash != '' && (
                        <div class='px-2 text-sm'>Trả lời <span class='font-semibold'>{hash.split('|')[0]}</span><span onClick={() => setHash('')} class='text-sm font-semibold mx-2 text-red-800'>Hủy</span></div>
                    )}
                    <div class='flex items-center my-2 px-2'>
                        <input class='bg-gray-200' value={comment} onChange={e => setComment(e.target.value)} type='text' placeholder='Nhập bình luận ...' />
                        <button onClick={click} class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4'>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
}


function List({ pid, id, user,name, content, time, tym, distym,onsetHash }) {
    let [like, setLike] = useState(JSON.parse(tym).length)
    let [dislike, setDislike] = useState(JSON.parse(distym).length)
   
    const changeUrl = () => {
        onsetHash('#' + JSON.parse(user).user + '|' + id)
    }

    const likeAction = () => {
        $.post('/api/post/action', {
            id,
            user: localStorage.login,
            type: 'replys',
            action: 'like'
        }, data => {
            if (data.error) alert(data.message)
            else setLike(like + 1)
        })
    }

    const dislikeAction = () => {
        $.post('/api/post/action', {
            id,
            user: localStorage.login,
            type: 'replys',
            action: 'dislike'
        }, data => {
            if (data.error) alert(data.message)
            else setDislike(dislike + 1)
        })
    }
    return (
        <div>
            <div class='flex p-2'>
                <div class='mx-3 w-10 h-8 rounded-full bg-yellow-600 flex justify-center items-center font-bold text-white'>{JSON.parse(user).user.slice(0, 1)}</div>
                <div class='w-full'>
                    <div class='flex items-center'>
                        <div class='font-bold mr-2'>{JSON.parse(user).user}</div> - <div class='text-sm mx-2'>{time}</div>
                    </div>
                    <div class='p-2 rounded bg-gray-300'>
                        <div class='mt-2'>{name != '' && (<span class='rounded mr-1 p-1 bg-blue-500 font-bold text-xs text-white'>{name}</span>)} {content}</div>
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
        </div>
    )
}
export default Reply;