import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import React, { useCallback } from 'react'
import './Auth.css'

export function Auth() {
  const onRendered = useCallback(
    node => {
      if (node) {
        const auth = firebase.auth()
        const ui = new firebaseui.auth.AuthUI(auth)
        ui.start(node, {
          callbacks: {
            signInSuccessWithAuthResult(authResult, redirectUrl) {
              // User successfully signed in.
              // Return type determines whether we continue the redirect automatically
              // or whether we leave that to developer to handle.
              return false
            },
            uiShown() {

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
      }
    },
    []
  )


  return (
    <div className="auth" ref={onRendered} />
  )
}
