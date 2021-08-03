import React from "react";
import { Avatar } from "@material-ui/core";

function SearchResultCard({avatarImage, email, displayName}){
    return (
        <div className="searchResultCard">
            <Avatar src={avatarImage}/>
            <p>{displayName}</p>
            <p>{email}</p>
            <button>New Chat with {displayName}</button>
        </div>
    )
};

export default SearchResultCard;