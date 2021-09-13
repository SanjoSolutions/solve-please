import React, { useState, useCallback } from 'react'
import './SolutionRequest.css'
import { requestASolutionToo } from './domain/requestSolutionToo.js'
import { addSolutionRequestToUsersRequestedSolutions } from './firebase/addSolutionRequestToUsersRequestedSolutions.js'
import { getDatabase } from './firebase/getDatabase.js'
import { initializeApp } from './firebase/initializeApp.js'
import { useUserSolutionRequests } from './useUserSolutionRequests.js'

initializeApp()

const database = getDatabase()

export function SolutionRequest({solutionRequest}) {
  const id = solutionRequest.id
  const requestData = solutionRequest.data()
  const {summary, details} = requestData
  const title = summary
  const body = details

  const [numberOfRequesters, setNumberOfRequesters] = useState(
    requestData.numberOfRequesters
  )

  const userSolutionRequests = useUserSolutionRequests()
  const userSolutionRequestIds = new Set(
    userSolutionRequests.map(userSolutionRequest => userSolutionRequest.id)
  )
  const [
    isAlsoLookingForASolutionForThisProblemRequestInProgress,
    setIsAlsoLookingForASolutionForThisProblemRequestInProgress
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
                  solutionRequest.data().numberOfRequesters ?? 0
                )
                transaction.update(
                  solutionRequestReference,
                  {
                    numberOfRequesters: newNumberOfRequesters2,
                  }
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
      numberOfRequesters
    ]
  )

  return (
    <div data-id={id} className="card mb-2">
      <div className="card-body">
        <span
          className="number-of-requesters float-end"
          title="Number of people looking for a solution for this problem"
        >
          {numberOfRequesters}
        </span>
        <h5 className="card-title">{title}</h5>
        <p>
          {body}
        </p>
        {/*<a href="#" className="card-link">Details</a>*/}
        <div className="float-end">
          {/*
          <button className="btn btn-light propose-solution mb-2 mb-md-0 me-2">
            Propose solution
          </button>*/}{/*
        */}<button
            className="btn btn-light also-looking-for-a-solution-for-this-problem"
            disabled={isAlsoLookingForASolutionForThisProblemRequestInProgress || userSolutionRequestIds.has(id)}
            onClick={onAlsoLookingForASolutionForThisProblem}
          >
              Also looking for a solution for this problem
          </button>
        </div>
      </div>
    </div>
  )
}
