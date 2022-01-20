import React from 'react';
import '../css/leftbar.css'
import avatar from '../ico/avatar.png'
import status from '../ico/status.png'
import chat from '../ico/chat.png'
import menu from '../ico/menu.png'
import search from '../ico/search.png'
import { SidebarChat } from './SidebarChat';
export const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className="leftbar__header">
                <div className="avatar">
                    <img className='leftbar_header_ico1' src={avatar} alt="" />
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
                <SidebarChat Room="Party Poopers" name="f" />
                <SidebarChat Room="Insane" name="a23" />
                <SidebarChat Room="Fan page" name="v" />
                <SidebarChat Room="Buddy" name="v457" />
                <SidebarChat Room="Timepass group" name="ryhgg" />
                <SidebarChat Room="Party Poopers" name="f" />
                <SidebarChat Room="Insane" name="a23" />
            </div>
        </div>
    )
};
