import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import $ from 'jquery'
import {NavLink} from 'react-router-dom'

function Nofication(props) {
  let [list,setList] = useState([])

  useEffect(() => {
    $.post('/api/nofication', {
      user: localStorage.login
    }, data => {
      setList(data)
    })
    $.post('/api/nofication/read', {
      user: localStorage.login
    })
  },[])
  return (
    <div class='bg-white w-full'>
      <List
        size="small"
        header={<div class='font-bold'>Thông báo</div>}
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <NavLink class={item.is_read == '0' ? 'bg-yellow-200 p-2' : 'p-2'} to={'/post/' + item.pid}>
              <span class='font-bold'>{item.name}</span> {item.message} 
            </NavLink>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Nofication;