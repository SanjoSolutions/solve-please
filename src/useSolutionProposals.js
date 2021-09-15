import { useMemo } from 'react'
import { getSolutionProposalsCollection } from './getSolutionProposalsCollection.js'
import { useDocumentSnapshots } from './unnamed/react/firebase/useDocumentSnapshots.js'

export function useSolutionProposals(solutionRequestId) {
  const queryRef = useMemo(
    () => getSolutionProposalsCollection(solutionRequestId),
    [solutionRequestId],
  )
  return useDocumentSnapshots(queryRef)
}
