import React from 'react';
import '../css/chatbox.css'
export const SidebarChat = (props) => {
    return (
        <div className='sidebarchat'>
            <div className="avatarchat">
                <img src={`https://avatars.dicebear.com/api/male/${props.name}.svg?background=%230000ff`} alt=""/>
            </div>
            <div className="sidebarchatInfo">
                <h5>{props.Room}</h5>
                <p>Last message ... </p>
            </div>
        </div>
    );
};
