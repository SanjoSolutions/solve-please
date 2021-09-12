import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCcWA6ATqEHbxfK3LfHpwvIukjdIKeUatM',
  authDomain: 'solve-please.firebaseapp.com',
  projectId: 'solve-please',
  storageBucket: 'solve-please.appspot.com',
  messagingSenderId: '45732995708',
  appId: '1:45732995708:web:85e6965b6be8b37877dff9',
}

firebase.initializeApp(firebaseConfig)

const database = firebase.firestore()
if (location.hostname === 'localhost') {
  database.useEmulator('localhost', 8080)
}

document.addEventListener('DOMContentLoaded', function () {
  const $form = document.getElementById('requestSolution')
  const $summary = document.getElementById('summary')
  const $details = document.getElementById('details')
  $form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const summary = $summary.value
    const details = $details.value
    const requestRef = await database.collection('solutionRequests').add({
      summary,
      details,
      numberOfRequesters: 1
    })
    const userId = firebase.auth().currentUser?.uid
    const requestsRef = database
      .collection('users').doc(userId)
      .collection('requests')
    await requestsRef.doc(requestRef.id).set({})
  })
})
