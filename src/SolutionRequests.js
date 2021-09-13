import React from 'react'
import { SolutionRequest } from './SolutionRequest.js'
import { useSearchTerm } from './useSearchTerm.js'
import { useSolutionRequests } from './useSolutionRequests.js'

export function SolutionRequests() {
  const searchTerm = useSearchTerm()
  const solutionRequests = useSolutionRequests(searchTerm)

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
