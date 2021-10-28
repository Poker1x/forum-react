import React, { useEffect, useReducer, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import $ from 'jquery'
import Category from '../ui/post/Category'
import Comment from '../ui/post/Comment'

function Post(props) {
    const params = useParams()
    let [post, setPost] = useState({})
    let [load, setLoad] = useState(false)
    let [user, setUser] = useState('')
    let [avt, setAvt] = useState('')
    let [like,setLike] = useState(0)
    let [dislike,setDislike] = useState(0)


    useEffect(() => $.get('/api/post/' + params.id, data => {
        setPost(data)
        setLoad(true)
        setUser(JSON.parse(data.user))
        setAvt(JSON.parse(data.user).user.slice(0,1))
        setLike(JSON.parse(data.tym).length)
        setDislike(JSON.parse(data.distym).length)
    }), [])


    const likeAction = () => {
        $.post('/api/post/action',{
            id: params.id,
            user: localStorage.login,
            type: 'posts',
            action: 'like'
        },data => {
            if(data.error) alert(data.message)
            else setLike(like + 1)
        })
    }

    const dislikeAction = () => {
        $.post('/api/post/action',{
            id: params.id,
            user: localStorage.login,
            type: 'posts',
            action: 'dislike'
        },data => {
            if(data.error) alert(data.message)
            else setDislike(dislike + 1)
        })
    }

    return (
        <div class='bg-white w-full'>
            {load && (
                <div c>
                    <div class='flex items-center px-2 py-4'>
                        <div class='mx-3 w-8 h-8 rounded-full bg-yellow-600 flex justify-center items-center font-bold text-white'>{avt}</div>
                        <div>
                            <div class='font-bold'>{user.user}</div>
                            <div class='text-xs'>{post.time}</div>
                        </div>
                    </div>
                    <div class='mx-6 my-2 text-2xl font-bold'>{post.title}</div>
                    <div class='mx-6 my-2 text-xs px-2 py-1 rounded inline-block mx-4 bg-green-500 text-white font-medium'>{Category.list[post.tag]}</div>
                    <div class='py-4 px-8 mt-4 border-t-2'>{post.content}</div>
                    <div class='flex justify-between py-2 px-5 border-b-2'>
                        <div class='flex'>
                            <div onClick={likeAction} class='mx-3'><i class="text-base far fa-thumbs-up"></i><span class='text-base font-semibold ml-1'>{like}</span></div>
                            <div onClick={dislikeAction} class='mx-3'><i class="text-base far fa-thumbs-down"></i><span class='text-base font-semibold ml-1'>{dislike}</span></div>
                        </div>
                    </div>
                    <Comment puser={user.user} id={params.id}/>
                </div>
            )}
        </div>
    )
}

export default Post