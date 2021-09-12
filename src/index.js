import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import './index.css'
import App from './App'
import { initializeApp } from './firebase/initializeApp.js'
import reportWebVitals from './reportWebVitals'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

initializeApp()

const auth = firebase.auth()
window.auth = auth
if (window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

const ui = new firebaseui.auth.AuthUI(auth)

const authContainerId = 'firebaseui-auth-container'
ui.start(`#${ authContainerId }`, {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      document.getElementById(authContainerId).remove()
      return false
    },
    uiShown: function () {

    },
  },
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
