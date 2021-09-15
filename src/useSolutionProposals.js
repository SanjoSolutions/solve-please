import { useMemo } from 'react'
import { getSolutionProposalsCollection } from './getSolutionProposalsCollection.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionProposals(solutionRequestId) {
  const queryRef = useMemo(
    () => getSolutionProposalsCollection(solutionRequestId),
    [solutionRequestId]
  )
  return useDocuments(queryRef)
}
