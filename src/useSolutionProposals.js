import { getSolutionProposalsCollection } from './getSolutionProposalsCollection.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionProposals(solutionRequestId) {
  const queryRef = getSolutionProposalsCollection(solutionRequestId)
  return useDocuments(queryRef)
}
