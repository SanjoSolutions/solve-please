import React, { useCallback, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addSolutionRequestToUsersRequestedSolutions } from './firebase/addSolutionRequestToUsersRequestedSolutions.js'
import { getDatabase } from './firebase/getDatabase.js'
import { initializeApp } from './firebase/initializeApp.js'
import { useRequireLoggedIn } from './useRequireLoggedIn.js'

initializeApp()

export function RequestSolution() {
  useRequireLoggedIn()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const summaryRef = useRef(null)
  const detailsRef = useRef(null)
  const history = useHistory()

  const onSubmit = useCallback(
    async function (event) {
      event.preventDefault()
      setIsSubmitting(true)
      const $summary = summaryRef.current
      const $details = detailsRef.current
      const summary = $summary.value
      const details = $details.value
      const database = getDatabase()
      const requestRef = await database.collection('solutionRequests').add({
        summary,
        details,
        numberOfRequesters: 1,
      })
      await addSolutionRequestToUsersRequestedSolutions(requestRef.id)
      setIsSubmitting(false)
      history.push('/')
    },
    [
      history
    ],
  )

  return (
    <div>
      <h1 className="h2">Submit a request for a problem solution</h1>
      <p>
        Please describe the problem that you'd like to be solved.
      </p>
      <form onSubmit={ onSubmit }>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">Summary</label>
          <textarea
            ref={ summaryRef }
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
            ref={ detailsRef }
            className="form-control"
            name="details"
            rows={ 6 }
            defaultValue={ '' }
          />
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={ isSubmitting }
          >
            Submit request
          </button>
        </div>
      </form>
    </div>
  )
}
