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

document.addEventListener('DOMContentLoaded', async function () {
  const $solutionRequests = document.getElementById('solutionRequests')
  const $solutionRequestTemplate = document.getElementById('solutionRequest')
  const solutionRequests = await database.collection('solutionRequests')
    .get(
      database.collection('solutionRequests')
        .orderBy('numberOfRequesters', 'desc')
    )
  const auth = firebase.auth()
  const userId = auth.currentUser?.uid
  const userDocument = await database.collection('users').doc(userId).get()
  const user = userDocument.exists ? userDocument.data() : null
  const userRequestIds = new Set(user ? user.requests : [])
  debugger

  for (const solutionRequest of solutionRequests.docs) {
    const id = solutionRequest.id
    const { summary, details, numberOfRequesters } = solutionRequest.data()
    const $solutionRequest = $solutionRequestTemplate.content.cloneNode(true)
    const title = summary
    const body = details
    const $card = $solutionRequest.children[0]
    $card.setAttribute('data-id', id)
    $solutionRequest.querySelector('.number-of-requesters').textContent =
      numberOfRequesters
    $solutionRequest.querySelector('.card-title').textContent = title
    $solutionRequest.querySelector('p').textContent = body
    const $alsoLookingForASolutionForThisProblem = $solutionRequest.querySelector(
      '.also-looking-for-a-solution-for-this-problem'
    )
    $alsoLookingForASolutionForThisProblem.disabled = userRequestIds.has(id)
    $solutionRequests.appendChild($solutionRequest)
  }

  $solutionRequests.addEventListener('click', async function (event) {
    const { target } = event
    if (target.classList.contains('also-looking-for-a-solution-for-this-problem')) {
      const $card = target.closest('.card')
      const $numberOfRequesters = $card.querySelector('.number-of-requesters')
      let numberOfRequesters = Number($numberOfRequesters.textContent)
      numberOfRequesters += 1
      $numberOfRequesters.textContent = numberOfRequesters
      target.disabled = true

      const id = $card.getAttribute('data-id')
      const solutionRequestReference = database.collection('solutionRequests').doc(id)
      try {
        numberOfRequesters = await database.runTransaction(
          async (transaction) => {
            const solutionRequest = await transaction.get(solutionRequestReference)
            if (solutionRequest.exists()) {
              const numberOfRequesters = (solutionRequest.data().numberOfRequesters ??
                0) + 1
              transaction.update(solutionRequestReference, {
                numberOfRequesters,
              })
            }
          },
        )
        if (typeof numberOfRequesters === 'number') {
          $numberOfRequesters.textContent = numberOfRequesters
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
})
