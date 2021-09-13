import firebase from 'firebase/compat/app'
import { getDatabase } from './getDatabase.js'

export async function addSolutionRequestToUsersRequestedSolutions(solutionRequestId) {
  const database = getDatabase()
  const userId = firebase.auth().currentUser?.uid
  if (userId) {
    const requestsRef = database
      .collection('users').doc(userId)
      .collection('solutionRequests')
    await requestsRef.doc(solutionRequestId).set({})
  }
}
