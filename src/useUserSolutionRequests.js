import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from 'react'

export function useUserSolutionRequests() {
  const [userSolutionRequests, setUserSolutionRequests] = useState([])

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const userId = user.uid
      const database = firebase.firestore()
      const userSolutionRequestsRef = database.collection('users').doc(userId)
        .collection('requests')
      userSolutionRequestsRef.onSnapshot(snapshot => {
        const solutionRequests = []
        snapshot.forEach(document => {
          solutionRequests.push(document)
        })
        setUserSolutionRequests(solutionRequests)
      })
    }
  })

  return userSolutionRequests
}
