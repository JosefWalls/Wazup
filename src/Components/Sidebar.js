import React, { useEffect, useState } from 'react';
import "./../Styling/Sidebar.css";
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@material-ui/icons';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase';
import firebase from 'firebase';
import {updateState} from "./../redux/reducers/userReducer";
import { Link } from 'react-router-dom';

function Sidebar(){

    const CurrentUser = useSelector((state) => state.userReducer.CurrentUser);
    const SearchedUser = useSelector((state) => state.userReducer.SearchedUser);
    const [searchInput, setSearchInput] = useState();
    const dispatch = useDispatch();

    console.log(CurrentUser.photoURL)

    const handleSearch = (e) => {
        console.log(searchInput)
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={CurrentUser.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <Link to="/Search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <p>Search for New Friends</p>
                    </div>
                </Link>
            </div>

            <div className="sidebar__chats">
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
                    <p>ytest chat</p>
            </div>
        </div>
    )
}

export default Sidebar;