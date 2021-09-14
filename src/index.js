import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import './index.css'
import App from './App'
import { initializeApp } from './firebase/initializeApp.js'
import { isDevelopment } from './unnamed/isDevelopment.js'
import reportWebVitals from './reportWebVitals'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

initializeApp()

const auth = firebase.auth()
if (isDevelopment()) {
  auth.useEmulator('http://localhost:9099')
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
