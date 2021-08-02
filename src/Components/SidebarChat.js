import React from 'react';
import "./../Styling/Sidebar.css";
import { Avatar } from '@material-ui/core';

function SidebarChat(){
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                <h2>Josef Walls</h2>
                <p>This is my last message. ever.</p>
            </div>
        </div>
    )
}

export default SidebarChat;