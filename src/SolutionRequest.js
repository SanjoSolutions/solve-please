import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { requestASolutionToo } from './domain/requestSolutionToo.js'
import { addSolutionRequestToUsersRequestedSolutions } from './firebase/addSolutionRequestToUsersRequestedSolutions.js'
import { getProposeSolutionModal } from './getProposeSolutionModal.js'
import { SolutionProposals } from './SolutionProposals.js'
import { getDatabase } from './unnamed/firebase/compat/getDatabase.js'
import { initializeApp } from './firebase/initializeApp.js'
import './SolutionRequest.scss'
import { useIsLoggedIn } from './unnamed/react/firebase/useIsLoggedIn.js'
import { useUserDocument } from './unnamed/react/firebase/useUserDocument.js'
import { useSolutionProposals } from './useSolutionProposals.js'

/* global bootstrap */

initializeApp()

const database = getDatabase()

export function SolutionRequest({ solutionRequest, link }) {
  link = link ?? false
  const id = solutionRequest.id
  const requestData = solutionRequest.data()
  const { summary, details } = requestData
  const title = summary
  const body = details

  const isLoggedIn = useIsLoggedIn()

  const initializePopover = useCallback(
    node => {
      if (node && !isLoggedIn) {
        new bootstrap.Popover(
          node,
          {
            trigger: 'hover focus',
            content: 'Please log in first.',
            placement: 'top'
          }
        )
      }
    },
    [isLoggedIn]
  )

  const [numberOfRequesters, setNumberOfRequesters] = useState(
    requestData.numberOfRequesters,
  )

  const userDocument = useUserDocument()
  const userSolutionRequestIds = userDocument ?
    new Set(userDocument.data().solutionRequests) :
    null
  const [
    isAlsoLookingForASolutionForThisProblemRequestInProgress,
    setIsAlsoLookingForASolutionForThisProblemRequestInProgress,
  ] = useState(false)

  const onAlsoLookingForASolutionForThisProblem = useCallback(
    async function onAlsoLookingForASolutionForThisProblem(event) {
      event.preventDefault()
      setIsAlsoLookingForASolutionForThisProblemRequestInProgress(true)
      const newNumberOfRequesters = requestASolutionToo(numberOfRequesters)
      setNumberOfRequesters(newNumberOfRequesters)

      const solutionRequestReference = database
        .collection('solutionRequests')
        .doc(id)
      try {
        const newNumberOfRequestersFromDatabase = await database.runTransaction(
          async (transaction) => {
            const solutionRequest = await transaction.get(solutionRequestReference)
            if (solutionRequest.exists) {
              await addSolutionRequestToUsersRequestedSolutions(solutionRequest.id)

              const newNumberOfRequesters2 = requestASolutionToo(
                solutionRequest.data().numberOfRequesters ?? 0,
              )
              transaction.update(
                solutionRequestReference,
                {
                  numberOfRequesters: newNumberOfRequesters2,
                },
              )
              return newNumberOfRequesters2
            }
          },
        )
        if (typeof newNumberOfRequestersFromDatabase === 'number') {
          setNumberOfRequesters(newNumberOfRequestersFromDatabase)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsAlsoLookingForASolutionForThisProblemRequestInProgress(false)
      }
    },
    [
      id,
      numberOfRequesters,
    ],
  )

  const proposeSolution = useCallback(
    event => {
      event.preventDefault()
      sessionStorage.setItem('solutionRequestId', id)
      const modal = getProposeSolutionModal()
      modal.show()
      document.getElementById('solution').focus()
    },
    [id]
  )

  const solutionProposals = useSolutionProposals(id)

  const inner = (
    <div className="card-body">
      <span
        className="number-of-requesters float-end"
        title="Number of people looking for a solution for this problem"
      >
        { numberOfRequesters }
      </span>
      <h5 className="card-title">{ title }</h5>
      <p>
        { body }
      </p>
      <SolutionProposals solutionProposals={solutionProposals} />
      {/*<a href="#" className="card-link">Details</a>*/ }
      <div className="float-end">
        <div
          ref={initializePopover}
          className="d-inline-block"
          tabIndex="0"
        >
          <button
            onClick={proposeSolution}
            className="btn btn-light propose-solution mb-2 mb-md-0 me-2"
            disabled={!isLoggedIn}
          >
            Propose solution
          </button>
        </div>
        <div
          ref={initializePopover}
          className="d-inline-block"
          tabIndex="0"
        >
          <button
            className="btn btn-light also-looking-for-a-solution-for-this-problem"
            disabled={
              isAlsoLookingForASolutionForThisProblemRequestInProgress ||
              !userSolutionRequestIds ||
              userSolutionRequestIds.has(id)
            }
            onClick={ onAlsoLookingForASolutionForThisProblem }
          >
            Also looking for a solution for this problem
          </button>
        </div>
      </div>
    </div>
  )

  const classNames = 'solution-request card mb-2'
  let outer
  if (link) {
    outer = (
      <Link to={`/solution-requests/${id}`} className={classNames}>
        {inner}
      </Link>
    )
  } else {
    outer = (
      <div className={classNames}>
        {inner}
      </div>
    )
  }

  return outer
}
