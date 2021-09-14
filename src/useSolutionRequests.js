import { useCallback } from 'react'
import { isSolutionRequestWhichIncludesSearchTerm } from './isSolutionRequestWhichIncludesSearchTerm.js'
import { getDatabase } from './unnamed/firebase/getDatabase.js'
import { partial } from './unnamed/partial.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionRequests(searchTerm) {
  const database = getDatabase()
  const queryRef = database
    .collection('solutionRequests')
    .orderBy('numberOfRequesters', 'desc')
  const filterFn = useCallback(
    (solutionRequests) => {
      if (searchTerm) {
        solutionRequests = solutionRequests.filter(
          partial(isSolutionRequestWhichIncludesSearchTerm, searchTerm),
        )
      }
      return solutionRequests
    },
    [searchTerm],
  )

  return useDocuments(queryRef, filterFn)
}
