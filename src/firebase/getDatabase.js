import firebase from 'firebase'
import 'firebase/firestore'
import { isDevelopment } from '../isDevelopment.js'
import memoize from 'lodash.memoize'

export const getDatabase = memoize(function getDatabase() {
  const database = firebase.firestore()
  if (isDevelopment()) {
    database.useEmulator('localhost', 8080)
  }
  return database
})
