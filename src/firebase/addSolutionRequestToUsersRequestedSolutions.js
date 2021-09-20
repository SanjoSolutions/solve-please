import firebase from 'firebase/compat/app'
import { getDatabase } from '../unnamed/firebase/compat/getDatabase.js'

export async function addSolutionRequestToUsersRequestedSolutions(solutionRequestId) {
  const database = getDatabase()
  const userId = firebase.auth().currentUser?.uid
  if (userId) {
    const userRef = database.collection('users').doc(userId)
    await userRef.set(
      {
        solutionRequests: firebase.firestore.FieldValue.arrayUnion(solutionRequestId)
      },
      {
        merge: true
      }
    )
  }
}
