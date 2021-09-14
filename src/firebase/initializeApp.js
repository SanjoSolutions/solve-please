import { initializeApp as initializeAppBase } from '../unnamed/firebase/initializeApp.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCcWA6ATqEHbxfK3LfHpwvIukjdIKeUatM',
  authDomain: 'solve-please.firebaseapp.com',
  projectId: 'solve-please',
  storageBucket: 'solve-please.appspot.com',
  messagingSenderId: '45732995708',
  appId: '1:45732995708:web:85e6965b6be8b37877dff9',
}

export function initializeApp() {
  initializeAppBase(firebaseConfig)
}
