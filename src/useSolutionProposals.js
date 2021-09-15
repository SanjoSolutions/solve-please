import { useMemo } from 'react'
import { getSolutionProposalsCollection } from './getSolutionProposalsCollection.js'
import { useDocumentSnapshot } from './unnamed/react/firebase/useDocumentSnapshots.js'

export function useSolutionProposals(solutionRequestId) {
  const queryRef = useMemo(
    () => getSolutionProposalsCollection(solutionRequestId),
    [solutionRequestId],
  )
  return useDocumentSnapshot(queryRef)
}
