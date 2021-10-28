import React from 'react';

import Chatbox from '../ui/Chatbox'
import ListPost from '../ui/post/ListPost'

function Home(props) {
    return (
        <div class='p-2 w-full'>
            <Chatbox />
            <ListPost />
        </div>
    );
}

export default Home;