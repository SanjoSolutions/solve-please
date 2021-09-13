import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { initializeApp } from './firebase/initializeApp.js'
import { withRouter } from 'react-router'

initializeApp()

const database = firebase.firestore()
if (window.location.hostname === 'localhost') {
  database.useEmulator('localhost', 8080)
}

class RequestSolutionBase extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.summaryRef = React.createRef(null)
    this.detailsRef = React.createRef(null)
  }

  async onSubmit(event) {
    event.preventDefault()
    const $summary = this.summaryRef.current
    const $details = this.detailsRef.current
    const summary = $summary.value
    const details = $details.value
    const requestRef = await database.collection('solutionRequests').add({
      summary,
      details,
      numberOfRequesters: 1,
    })
    const userId = firebase.auth().currentUser?.uid
    const requestsRef = database
      .collection('users').doc(userId)
      .collection('requests')
    await requestsRef.doc(requestRef.id).set({})
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1 className="h2">Submit a request for a problem solution</h1>
        <p>
          Please describe the problem that you'd like to be solved.
        </p>
        <form onSubmit={ this.onSubmit }>
          <div className="mb-3">
            <label htmlFor="summary" className="form-label">Summary</label>
            <textarea
              ref={ this.summaryRef }
              className="form-control"
              name="summary"
              rows={ 3 }
              autoFocus
              defaultValue={ '' }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">Details</label>
            <textarea
              ref={ this.detailsRef }
              className="form-control"
              name="details"
              rows={ 6 }
              defaultValue={ '' }
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">Submit request</button>
          </div>
        </form>
      </div>
    )
  }
}

export const RequestSolution = withRouter(RequestSolutionBase)
