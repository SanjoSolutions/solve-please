import { getDatabase } from './unnamed/firebase/compat/getDatabase.js'

export function getSolutionProposalsCollection(solutionRequestId) {
  const database = getDatabase()
  return database
    .collection('solutionRequests')
    .doc(solutionRequestId)
    .collection('solutionProposals')
}
