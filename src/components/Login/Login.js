// WORKING CODE

import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './Login.css';



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
                    // extra
                    // history.replace(from);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    // extra
                    setLoggedInUser(user);
                    history.replace(from);
                    
                    console.log('sign in user info', res.user);
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

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        })
            .then(function () {
                console.log('user name updated successfully')
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const eye = <FontAwesomeIcon icon={faEye} />;
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };




    return (
        <div className="container">
            <div className="card mt-5 col-md-6" style={{ backgroundColor: 'rgb(234, 224, 215)' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h3>{newUser ? 'Create an account' : 'Log In'}</h3>
                            {/* <label htmlFor="exampleInputEmail">Your Name</label> */}
                            {newUser && <input type="text" name="name" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" onBlur={handleBlur} placeholder="Name" />
                            }
                            {newUser && <small id="emailHelp" className="form-text text-muted">Enter Your Name</small>}
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="exampleInputEmail">Email Address</label> */}
                            <input type="email" name="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" onBlur={handleBlur} placeholder="Email" required />
                            <small id="emailHelp" className="form-text text-muted">Enter Your e-mail address</small>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="exampleInputPassword">Password</label> */}
                            <input type={passwordShown ? "text" : "password"} name="password" className="form-control" id="exampleInputPassword" onBlur={handleBlur} placeholder="Password" required />
                            <i className="eye-icon" onClick={togglePasswordVisiblity}>{eye}</i>
                            <small id="emailHelp" className="form-text text-muted">Enter minimum 7 characters</small>
                            {/* <input type="submit" className="btn btn-primary mt-3" value={newUser ? 'Create an account' : 'Log In'} /> */}
                            <button type="submit" className="btn btn-primary mt-3">{newUser ? 'Create an account' : 'Log In'}</button>
                            {/* <p style={{ fontWeight: 'bolder' }}>
                                {
                                    user.success && <p style={{ color: "green" }}>Acount {newUser ? 'Created' : 'Logged In'} Successfully</p>
                                }
                            </p> */}
                        </div>
                        <p style={{ color: "red" }}>{user.error}</p>
                        <p style={{ fontWeight: 'bolder' }}>
                            {
                                user.success && <p style={{ color: "green" }}>Acount {newUser ? 'Created' : 'Logged In'} Successfully <br/>Now Login to your account</p>
                            }
                        </p>
                        <div className="form-group">
                            <label htmlFor="" className="text-muted">Don't have any account ?</label><br />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" onChange={() => setNewUser(!newUser)} name="newUser" id="exampleCheck" />
                            <label htmlFor="">Create an account</label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <div>
                    {/* {
                        user.isSignedIn ? <button className="btn btn-primary mt-2" onClick={handleSignOut}>Sign Out</button> :
                            <button className="btn btn-primary mt-2" onClick={handleGoogleSignIn}>Continue with Google</button>
                    } */}
                    <button className="btn btn-primary mt-2" onClick={handleGoogleSignIn}>Continue with Google</button>
                </div>
                <div>
                    <button className="btn btn-primary mt-2" onClick={handleFacebookSignIn}>Continue with Facebook</button>
                </div>
                <div className="col-md-6 mt-2" style={{ fontSize: '11px', fontWeight: 'bold', color: 'rgb(255, 234, 0)', backgroundColor: 'rgb(255, 149, 0)' }}>Note: You have to Login first to set your destination .</div>
            </div>
        </div>
    );
};

export default Login;
