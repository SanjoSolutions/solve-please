import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState, useEffect } from 'react'

export function useUserSolutionRequests() {
  const [userSolutionRequests, setUserSolutionRequests] = useState([])

  useEffect(
    () => {
      let hasBeenUnmounted = false
      let unsubscribe = null

      firebase.auth().onAuthStateChanged(async (user) => {
        if (!hasBeenUnmounted && user) {
          const userId = user.uid
          const database = firebase.firestore()
          const userSolutionRequestsRef = database.collection('users').doc(userId)
            .collection('requests')
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
    }
  )

  return userSolutionRequests
}
