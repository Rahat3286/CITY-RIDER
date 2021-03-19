import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



const Login = () => {
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
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
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

    return (
        <div className="container">
            <div className="card mt-5" style={{ width: '100%' }}>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail">Email Address</label>
                            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Enter the password" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck" />
                            <label className="form-check-label" for="exampleCheck">Remember Me</label>
                        </div>
                        <button type="submit" className="btn btn-primary justify-content-center">Login</button>
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
