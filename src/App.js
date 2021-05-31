import React from 'react';
import { useState, useEffect } from 'react';
import firebase from "./firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Link to="/">top</Link>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}


const Auth = () => {
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('enter email');
  }

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase.auth().signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          alert("login success");
        })
        .catch((error) => {
          alert("login failed");
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  return (
    <p>auth page</p>
  );
}

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const firebaseUiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        return true;
      },
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        forceSameDevice: false,
        emailLinkSignIn: function () {
          return {
            url: 'https://logindemo-aa8d6.web.app/auth',
            handleCodeInApp: true,
          };
        }
      },
    ],
    tosUrl: 'https://terms-213ad.web.app/',
    privacyPolicyUrl: 'https://privacypolicy-bb1c0.web.app/',
  };



  if (!isSignedIn) {
    return (
      <section>
        <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
      </section>
    );
  } else {
    return (
      <section>
        <div>login complete</div>
      </section>
    );
  }
}


export default App;
