import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import React, { useCallback, useEffect, useState } from 'react'
import './Auth.css'
import { useHistory } from 'react-router-dom'
import { useUser } from './useUser.js'

export function Auth() {
  const history = useHistory()
  const user = useUser()

  const onRendered = useCallback(
    node => {
      if (node) {
        const auth = firebase.auth()
        let ui = firebaseui.auth.AuthUI.getInstance()
        if (!ui) {
          ui = new firebaseui.auth.AuthUI(auth)
        }
        ui.start(node, {
          callbacks: {
            signInSuccessWithAuthResult(authResult, redirectUrl) {
              const redirectToPath = history.location?.state?.redirectToAfterLogin ?? ''
              history.replace(redirectToPath)
              return false
            }
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
    [history]
  )


  return (
    <div className="auth" ref={onRendered} />
  )
}
