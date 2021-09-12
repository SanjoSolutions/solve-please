import firebase from 'firebase'
import 'firebase/firestore'
import { useState } from 'react'

export function useUser() {
  const [user, setUser] = useState(null)

  ;(async () => {
    const auth = firebase.auth()
    const userId = auth.currentUser?.uid
    const database = firebase.firestore()
    const userDocument = await database.collection('users').doc(userId).get()
    if (userDocument.exists) {
      setUser(userDocument)
    }
  })()

  return user
}
