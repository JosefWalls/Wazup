import React, { useEffect, useState } from 'react';
import "./../Styling/Search.css";
import SearchResultCard from './SearchResultCard';
import { KeyboardBackspace } from '@material-ui/icons';
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from "./../redux/reducers/searchReducer";
import axios from "./../axios";

function Search(){

    const CurrentUser = useSelector((state) => state.userReducer.CurrentUser);
    const SearchInput = useSelector((state) => state.searchReducer.SearchInput);
    const UsersFound = useSelector((state) => state.searchReducer.UsersFound);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");

    useEffect(async() => {
        await axios.get("/Users/Random")
        .then(users => {
            dispatch(updateState({UsersFound: users.data}));
            console.log(UsersFound)
        })
        .catch(err => console.log(err.message))
    }, [SearchInput === ""])

    const handleInput = async (e) => {
        e.preventDefault();
        dispatch(updateState({SearchInput: e.target.value}));
        await axios.get(`/Users/Search/${e.target.value}`)
        .then(users => {
            dispatch(updateState({UsersFound: users.data}));
            console.log(UsersFound)
        })
        .catch(err => console.log(err.message))
    }

    return (
        <div className="search">
            <header className="search__field">
                <input placeholder="...." onChange={handleInput}/>
                <KeyboardBackspace/>
            </header>
            <div className="search__results">
                {UsersFound.length !== 0?  UsersFound.map((user, i) => {
                    return (
                        <SearchResultCard
                            avatarImage={user.HeaderImage}
                            email={user.Email}
                            displayName={user.Username}
                        />
                    )
                }): <p>Please enter some letters man</p>}
            </div>
        </div>
    )
};

export default Search;