import firebase from 'firebase'
import { isDevelopment } from '../isDevelopment.js'

export function getDatabase() {
  const database = firebase.firestore()
  if (isDevelopment()) {
    database.useEmulator('localhost', 8080)
  }
  return database
}
