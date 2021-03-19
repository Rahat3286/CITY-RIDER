import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: ''
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                console.log(error);
                var errorMessage = error.message;
                console.log(error.message);
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                console.log('fb user', user);
                setLoggedInUser(user);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
                console.log(res)
            })
            .catch(err => {

            })
    }

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

            e.preventDefault();
    }




    return (
        <div className="container">
            <div className="card mt-5" style={{ width: '100%' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="exampleInputEmail">Your Name</label> */}
                            {newUser && <input type="text" name="name" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" onBlur={handleBlur} placeholder="Enter your Name" />}
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="exampleInputEmail">Email Address</label> */}
                            <input type="email" name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" onBlur={handleBlur} placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="exampleInputPassword">Password</label> */}
                            <input type="password" name="password" className="form-control" id="exampleInputPassword" onBlur={handleBlur} placeholder="Enter the password" required />
                        </div>
                        <p style={{ color: "red" }}>{user.error}</p>
                        {
                            user.success && <p style={{ color: "green" }}>User {newUser? 'Created' : 'Logged In'} Successfully</p>
                        }
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck" />
                            <label className="form-check-label" htmlFor="exampleCheck">Remember Me</label>
                        </div>
                        <input className="btn btn-primary" type="submit" value="submit" />
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label>New User Sign up</label>
                    </form>
                </div>
            </div>
            <div className="container">
                <div>
                    <button className="btn btn-primary mt-2" onClick={handleGoogleSignIn}>Continue with Google</button>
                </div>
                <div>
                    <button className="btn btn-primary mt-2" onClick={handleFacebookSignIn}>Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
