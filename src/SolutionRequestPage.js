import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SolutionRequest } from './SolutionRequest.js'
import { Spinner } from './Spinner.js'
import { getDatabase } from './unnamed/firebase/getDatabase.js'

export function SolutionRequestPage() {
  const [solutionRequest, setSolutionRequest] = useState(null)

  const { id } = useParams()
  useEffect(
    () => {
      async function retrieve() {
        const database = getDatabase()
        const solutionRequest = await database
          .collection('solutionRequests')
          .doc(id)
          .get()
        setSolutionRequest(solutionRequest)
      }

      retrieve()
    },
    [id]
  )


  return (
    <div className="flex-grow-1 d-flex flex-column">
      <h1 className="h2">Solution request</h1>
      {
        solutionRequest ?
          <SolutionRequest solutionRequest={solutionRequest} /> :
          <Spinner />
      }
    </div>
  )
}
