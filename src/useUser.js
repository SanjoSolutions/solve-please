import firebase from 'firebase'
import 'firebase/auth'
import { useState, useEffect } from 'react'

export function useUser() {
  const [user, setUser] = useState(null)

  useEffect(
    () => {
      const unsubscribe = firebase.auth().onAuthStateChanged(setUser)
      return unsubscribe
    },
    []
  )

  return user
}
