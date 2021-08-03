import React, { useEffect, useState } from 'react';
import "./../Styling/Search.css";
import SearchResultCard from './SearchResultCard';
import { KeyboardBackspace } from '@material-ui/icons';
import { auth } from '../firebase';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from "./../redux/reducers/searchReducer";
import axios from "./../axios";
import { Link, useHistory} from 'react-router-dom';

function Search(){

    const CurrentUser = useSelector((state) => state.userReducer.CurrentUser);
    const SearchInput = useSelector((state) => state.searchReducer.SearchInput);
    const UsersFound = useSelector((state) => state.searchReducer.UsersFound);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");

    useEffect(async() => {
        const user = firebase.auth().currentUser;
        if(user){
            dispatch(updateState({CurrentUser: user}))
        } else {
            alert("no user")
        }
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
                <Link to={`/Chat/${CurrentUser.uid}`}>
                    <KeyboardBackspace/>
                </Link>
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