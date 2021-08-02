import React, {useEffect, useState} from 'react';
import "./../Styling/LoginSignUp.css";
import firebase from 'firebase';
import { auth, storage } from '../firebase';
import { useSelector, useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState } from "./../redux/reducers/userReducer";
import axios from "./../axios";

function LoginSignUp(){

    const Username = useSelector((state) => state.userReducer.Username);
    const Password = useSelector((state) => state.userReducer.Password);
    const Email = useSelector((state) => state.userReducer.Email);
    const Phone = useSelector((state) => state.userReducer.Phone);
    const HeaderImage = useSelector((state) => state.userReducer.HeaderImage);
    const dispatch = useDispatch();
    

    const [displayLogin, setDisplayLogin] = useState(true);

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(updateState({[e.target.name]: e.target.value}))
    }

    const handleProfileImageUpload = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            dispatch(updateState({HeaderImage: e.target.files[0]}))
        }
    }

    const handleSignUp = (e) => {
        //first take care of uploading to storage
        let uploadTask = storage.ref(`profilePictures/${HeaderImage.name}`).put(HeaderImage);
        uploadTask.on("state_changed", (snapshot) => {

        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref("profilePictures").child(HeaderImage.name).getDownloadURL()
            .then((url) => {
                //then take care of adding first to mongodb
                // axios.post("/Users/New", {
                //     Username: Username,
                //     Email: Email,
                //     Phone: Phone,
                //     HeaderImage: url
                // })
                //then add user to firebase auth
                auth.createUserWithEmailAndPassword(Email, Password)
                .then((authUser) => {      
                    const user = firebase.auth().currentUser;
                    if(user){
                        return user.updateProfile({
                            displayName: Username,
                            email: Email,
                            photoURL: url,
                            phoneNumber: Phone
                        })
                    } else {
                        console.log("no user has been found")
                    }
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
    }

    const handleSignIn = () => {
        console.log(Email)
        auth.signInWithEmailAndPassword(Email, Password)
        .then((user) => {
            console.log(user)
        })
        .catch(err => console.log(err.message))
    }

    return (
        <div className="loginSignUp">
            {displayLogin ? 
            <div className="loginSignUp__inputBox">
                <header>
                    <h2>Waz up</h2>
                </header>
                <div className="loginSignUp__inputBoxFields">
                    <h6>Enter Email</h6>
                    <input type="text" placeholder="Ex: Johny Sens" name="Email" onChange={handleChange}/>
                    <h6>Enter Password</h6>
                    <input type="text" placeholder="Ex: password" name="Password" onChange={handleChange}/>
                    {Username && Password ? <button onClick={() => handleSignIn()}>Login</button>: null}
                    {/* above only shows if all necessary fields have been entered */}
                    <p onClick={() => setDisplayLogin(false)}>Dont have an account?</p>
                </div>
            </div>
            :
            <div className="loginSignUp__inputBox">
                <header>
                    <h2>Waz up</h2>
                </header>
                <div className="loginSignUp__inputBoxFields">
                    <h6>Enter Username</h6>
                    <input type="text" placeholder="Ex: Johny Sens" name="Username" onChange={handleChange}/>
                    <h6>Enter Password</h6>
                    <input type="text" placeholder="Ex: password" name="Password" onChange={handleChange}/>
                    <h6>Enter Email</h6>
                    <input type="text" name="Email" onChange={handleChange}/>
                    <h6>Enter Phone</h6>
                    <input type="text" name="Phone" onChange={handleChange}/>
                    <h6>Upload Profile Image</h6>
                    <input type="file" onChange={handleProfileImageUpload}/>
                    {/* upload header */}
                    <button onClick={() => handleSignUp()}>Register Account</button>
                    {/* {Username && Password && Email && Phone ? <button onClick={() => handleSignUp()}>Register Account</button>: null} */}
                    {/* above only shows if all necessary fields have been entered */}
                    <p onClick={() => setDisplayLogin(true)}>Already Have An Account?</p>
                </div>
            </div>}
        </div>
    )
};


export default LoginSignUp;