import React from 'react'

export function SolutionProposal({ solutionProposal }) {
  const { solution } = solutionProposal.data()
  return (
    <li>
      { solution }
    </li>
  )
}
