import React from 'react'
import { SolutionProposal } from './SolutionProposal.js'

export function SolutionProposals({solutionProposals}) {
  return (
    solutionProposals && solutionProposals.length >= 1 ?
      <div>
        <h6>Solution proposals</h6>
        <ul>
          {
            solutionProposals.map(
              solutionProposal =>
                <SolutionProposal
                  key={solutionProposal.id}
                  solutionProposal={solutionProposal}
                />
            )
          }
        </ul>
      </div> :
      null
  )
}
