import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: 'AIzaSyCcWA6ATqEHbxfK3LfHpwvIukjdIKeUatM',
  authDomain: 'solve-please.firebaseapp.com',
  projectId: 'solve-please',
  storageBucket: 'solve-please.appspot.com',
  messagingSenderId: '45732995708',
  appId: '1:45732995708:web:85e6965b6be8b37877dff9',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
window.auth = auth
if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
}

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
