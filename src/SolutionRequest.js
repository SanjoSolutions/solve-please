import React, { useState, useCallback } from 'react'
import './SolutionRequest.css'
import { initializeApp } from './firebase/initializeApp.js'
import { useUser } from './useUser.js'
import firebase from 'firebase'
import 'firebase/firestore'

initializeApp()

const database = firebase.firestore()
if (window.location.hostname === 'localhost') {
  database.useEmulator('localhost', 8080)
}

export function SolutionRequest({solutionRequest}) {
  const id = solutionRequest.id
  const requestData = solutionRequest.data()
  const {summary, details} = requestData
  const title = summary
  const body = details

  const [numberOfRequesters, setNumberOfRequesters] = useState(
    requestData.numberOfRequesters
  )

  const user = useUser()
  const [userRequestIds, setUserRequestIds] = useState(
    new Set(user ? user.data().requests : [])
  )

  const onAlsoLookingForASolutionForThisProblem = useCallback(
      async function onAlsoLookingForASolutionForThisProblem() {
        const newNumberOfRequesters = numberOfRequesters + 1
        setNumberOfRequesters(newNumberOfRequesters)
        setUserRequestIds(new Set([...userRequestIds, id]))

        const solutionRequestReference = database.collection('solutionRequests').doc(id)
        try {
          const newNumberOfRequestersFromDatabase = await database.runTransaction(
            async (transaction) => {
              const solutionRequest = await transaction.get(solutionRequestReference)
              if (solutionRequest.exists) {
                const numberOfRequesters =
                  (solutionRequest.data().numberOfRequesters ?? 0) + 1
                transaction.update(
                  solutionRequestReference,
                  {
                    numberOfRequesters,
                  }
                )
                return numberOfRequesters
              }
            },
          )
          if (typeof newNumberOfRequestersFromDatabase === 'number') {
            setNumberOfRequesters(newNumberOfRequestersFromDatabase)
          }
        } catch (error) {
          console.error(error)
        }
    },
    [
      id,
      numberOfRequesters,
      userRequestIds
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
        <a href="#" className="card-link">Details</a>
        <div className="float-end">
          <button className="btn btn-light propose-solution mb-2 mb-md-0 me-2">
            Propose solution
          </button>{/*
        */}<button
            className="btn btn-light also-looking-for-a-solution-for-this-problem"
            disabled={userRequestIds.has(id)}
            onClick={onAlsoLookingForASolutionForThisProblem}
          >
              Also looking for a solution for this problem
          </button>
        </div>
      </div>
    </div>
  )
}
