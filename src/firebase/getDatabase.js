import firebase from 'firebase'

export function getDatabase() {
  const database = firebase.firestore()
  if (window.location.hostname === 'localhost') {
    database.useEmulator('localhost', 8080)
  }
  return database
}
