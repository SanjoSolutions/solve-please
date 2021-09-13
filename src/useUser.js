import firebase from 'firebase/app'
import 'firebase/auth'
import { useState, useEffect } from 'react'

export function useUser() {
  const auth = firebase.auth()
  const [user, setUser] = useState(auth.currentUser)

  useEffect(
    () => {
      const unsubscribe = auth.onAuthStateChanged(setUser)
      return unsubscribe
    },
    [auth]
  )

  return user
}
