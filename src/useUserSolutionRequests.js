import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { useState, useEffect } from 'react'
import { getDatabase } from './firebase/getDatabase.js'

export function useUserSolutionRequests() {
  const [userSolutionRequests, setUserSolutionRequests] = useState(null)

  useEffect(
    () => {
      let hasBeenUnmounted = false
      let unsubscribe = null

      firebase.auth().onAuthStateChanged(async (user) => {
        if (!hasBeenUnmounted && user) {
          const userId = user.uid
          const database = getDatabase()
          const userSolutionRequestsRef = database.collection('users')
            .doc(userId)
            .collection('solutionRequests')
          unsubscribe = userSolutionRequestsRef.onSnapshot(snapshot => {
            if (!hasBeenUnmounted) {
              const solutionRequests = []
              snapshot.forEach(document => {
                solutionRequests.push(document)
              })
              setUserSolutionRequests(solutionRequests)
            }
          })
        }
      })

      return () => {
        hasBeenUnmounted = true
        if (unsubscribe) {
          unsubscribe()
        }
      }
    },
    []
  )

  return userSolutionRequests
}
