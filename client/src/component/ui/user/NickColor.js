import React from 'react';

function NickColor({user,level}) {
    let color = ''
    if(level === '1'){
        color = "#6666CC"
    } else if(level === '2'){
        color = 'blue'
    } else if(level === '3'){
        color = 'green'
    } else if(level === '4'){
        color = 'orange'
    } else if(level === '5'){
        color = 'red'
    } 
    return (
        <span style={{color,fontWeight:600}}>{user}</span>
    );
}

export default NickColor;