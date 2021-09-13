import React from 'react'
import { SolutionRequest } from './SolutionRequest.js'
import { useSearchTerm } from './useSearchTerm.js'
import { useSolutionRequests } from './useSolutionRequests.js'

export function SolutionRequests() {
  const searchTerm = useSearchTerm()
  const solutionRequests = useSolutionRequests(searchTerm)

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <h1 className="h2">Solution requests</h1>

      {
        solutionRequests ?
          solutionRequests.map(
            solutionRequest => <SolutionRequest
              key={ solutionRequest.id }
              solutionRequest={ solutionRequest }
            />,
          ) :
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }
    </div>
  )
}
