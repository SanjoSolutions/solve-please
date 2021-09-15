import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export function Auth() {
  const history = useHistory()

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
            }
          ],
        })
      }
    },
    [history]
  )


  return (
    <div
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
      ref={onRendered}
    />
  )
}
