import React from 'react'
import { useRequests } from './useRequests.js'
import { SolutionRequest } from './SolutionRequest.js'

export function SolutionRequests() {
  const solutionRequests = useRequests()

  return (
    <div id="solutionRequests">
      <h1 className="h2">Solution requests</h1>

      {
        solutionRequests.map(
          solutionRequest => <SolutionRequest
            key={solutionRequest.id}
            solutionRequest={solutionRequest}
          />
        )
      }
    </div>
  )
}
