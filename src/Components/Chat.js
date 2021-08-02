import { Avatar } from '@material-ui/core';
import React, {useState} from 'react';
import "./../Styling/Chat.css";
import {SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic} from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import axios from "./../axios";

function Chat({chatMessages}){
    
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            Message:   input,
            Name:  "Billey Gates",
            Timestamp: "Im a demo timestamp",
            Received:  true
        })

        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__header__info">
                    <h3>Room name</h3>
                    <p>Last seen at .....</p>
                </div>
                <div className="chat__header__right">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {chatMessages.map((message, index) => {
                    return (
                        <p className={`chat__message ${message.Received && "chat__reciever"}`}>
                            <span className="chat__name">{message.Name}</span>
                            {message.Message}
                            <span className="chat__timestamp">{message.Timestamp}</span>
                        </p>
                    )
                })}
            </div>

            <div className="chat__footer">
                    <InsertEmoticon/>
                    <form>
                        <input placeholder="Type a message" type="text" onChange={e => setInput(e.target.value)} value={input}/>
                        <button type="submit" onClick={sendMessage}>Send a message</button>
                    </form>
                    <Mic/>
            </div>

        </div>
    )
}

export default Chat;