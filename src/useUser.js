import firebase from 'firebase'
import 'firebase/firestore'
import { useState } from 'react'

export function useUser() {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged(setUser)

  return user
}
