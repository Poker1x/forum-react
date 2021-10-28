import React, { useState } from 'react';
import $ from 'jquery'
import Category from '../ui/post/Category'

function Add(props) {
    let [title,setTitle] = useState('')
    let [content,setContent] = useState('')
    let [select,setSelect] = useState('lap-trinh')


    const click = () => {
        $.post('/api/post',{
            title,
            content,
            tag: select,
            user: localStorage.login
        },data => {
            if(data.error) alert(data.message)
            else window.location.href = '/'
        })
    }
    return (
        <div>
            <div class='m-3 bg-white border-l-2'>
            <h1 class='p-2 font-bold border-b-2'>Đăng bài viết</h1>
            <div class='p-2'>
                <input class='border-2 my-2' type='text' placeholder='Nhập tiêu để ...' onChange={e => setTitle(e.target.value)} /> 
                <textarea class='w-full border-2 my-2 h-56' type='text' placeholder='Nhập nội dung ...' onChange={e => setContent(e.target.value)} ></textarea>
                <OptionTag list={Category.list} select={select} setSelect={setSelect} />
                <button 
                    class='border-2 my-2' type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={click}
                >
                    Đăng
                </button>
            </div>
        </div>
        </div>
    );
}

function OptionTag({list,select,setSelect}){
    return (
        <ul class='border-2 my-2'>
            {Object.entries(list).map(([k,v]) => (
                <li onClick={() => setSelect(k)} key={k} class={select == k ? ' bg-green-500 border-t-2 p-2 text-white' : 'border-t-2 p-2'}>{v}</li>
            ))}
        </ul>
    )
}
export default Add;