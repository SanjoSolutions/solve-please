import React, { useCallback, useState } from 'react'
import { requestASolutionToo } from './domain/requestSolutionToo.js'
import { addSolutionRequestToUsersRequestedSolutions } from './firebase/addSolutionRequestToUsersRequestedSolutions.js'
import { getProposeSolutionModal } from './getProposeSolutionModal.js'
import { SolutionProposal } from './SolutionProposal.js'
import { SolutionProposals } from './SolutionProposals.js'
import { getDatabase } from './unnamed/firebase/getDatabase.js'
import { initializeApp } from './firebase/initializeApp.js'
import './SolutionRequest.css'
import { useIsLoggedIn } from './unnamed/react/firebase/useIsLoggedIn.js'
import { useSolutionProposals } from './useSolutionProposals.js'
import { useUserSolutionRequests } from './useUserSolutionRequests.js'

/* global bootstrap */

initializeApp()

const database = getDatabase()

export function SolutionRequest({ solutionRequest }) {
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
            content: 'Please log in first.'
          }
        )
      }
    },
    [isLoggedIn]
  )

  const [numberOfRequesters, setNumberOfRequesters] = useState(
    requestData.numberOfRequesters,
  )

  const userSolutionRequests = useUserSolutionRequests()
  const userSolutionRequestIds = userSolutionRequests ?
    new Set(
      userSolutionRequests.map(userSolutionRequest => userSolutionRequest.id),
    ) :
    null
  const [
    isAlsoLookingForASolutionForThisProblemRequestInProgress,
    setIsAlsoLookingForASolutionForThisProblemRequestInProgress,
  ] = useState(false)

  const onAlsoLookingForASolutionForThisProblem = useCallback(
    async function onAlsoLookingForASolutionForThisProblem() {
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
    () => {
      sessionStorage.setItem('solutionRequestId', id)
      const modal = getProposeSolutionModal()
      modal.show()
      document.getElementById('solution').focus()
    },
    [id]
  )

  const solutionProposals = useSolutionProposals(id)

  return (
    <div data-id={ id } className="card mb-2">
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
          <button
            onClick={proposeSolution}
            className="btn btn-light propose-solution mb-2 mb-md-0 me-2"
          >
            Propose solution
          </button>
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
    </div>
  )
}
