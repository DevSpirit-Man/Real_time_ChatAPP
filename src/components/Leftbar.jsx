import React, { useEffect, useState } from 'react';
import '../css/leftbar.css'
import avatar from '../ico/avatar.png'
import status from '../ico/status.png'
import chat from '../ico/chat.png'
import menu from '../ico/menu.png'
import search from '../ico/search.png'
import { SidebarChat } from './SidebarChat';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

export const Leftbar = (props) => {
    const [room, setRoom] = useState([])
    console.log(room);
    useEffect(() =>
        onSnapshot(collection(db, "rooms"), (snapshot) => setRoom(snapshot.docs.map(doc => doc.data())))
    , [])
    function promptroom(e){
        e.preventDefault();
        console.log(("hello"));
        const roomprompt=prompt('Enter Room name',"Room xyz")
        console.log(roomprompt);
    }
    return (
        <div className='leftbar'>
            <div className="leftbar__header">
                <div className="avatar">
                    {(!props.avatar) ? (<img className='leftbar_header_ico1' src={avatar} alt="" />) : (<img style={{ borderRadius: '100%' }} className='leftbar_header_ico1' src={props.avatar} alt="" />)}
                </div>
                <div className="menus__header">
                    <img className='leftbar_header_ico' src={status} alt="" />
                    <img className='leftbar_header_ico' src={chat} alt="" />
                    <img className='leftbar_header_ico' src={menu} alt="" />
                </div>
            </div>
            <div className="leftbar__search">
                <img className='leftbar_header_ico2' src={search} alt="" />
                <input type="text" placeholder='Seach Rooms' name="" id="" />
            </div>
            <div className="leftbarchats">
                <button onclick={promptroom} style={{backgroundColor:'transparent',width:'90%',height:'30px',outline:'none',border:'none',cursor:'pointer',margin:'12px 12px',fontWeight:'bold'}}>Add New Group</button>
                {room?.map((item) => {
                   return <SidebarChat Room={item.name} name={item.name} />

                })}
                {/* <SidebarChat Room="Party Poopers" name="f" />
                <SidebarChat Room="Insane" name="a23" />
                <SidebarChat Room="Fan page" name="v" />
                <SidebarChat Room="Buddy" name="v457" />
                <SidebarChat Room="Timepass group" name="ryhgg" />
                <SidebarChat Room="Party Poopers" name="f" />
                <SidebarChat Room="Insane" name="a23" /> */}
            </div>
        </div>
    )
};
