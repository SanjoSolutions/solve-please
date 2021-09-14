import { useCallback, useMemo } from 'react'
import { isSolutionRequestWhichIncludesSearchTerm } from './isSolutionRequestWhichIncludesSearchTerm.js'
import { getDatabase } from './unnamed/firebase/getDatabase.js'
import { partial } from './unnamed/partial.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionRequests({
  searchTerm,
  startAfter,
  endBefore,
  limit,
  limitToLast
}) {
  const queryRef = useMemo(
    () => generateQueryRef({
      startAfter,
      endBefore,
      limit,
      limitToLast
    }),
    [
      startAfter,
      endBefore,
      limit,
      limitToLast
    ]
  )
  const filterFn = useCallback(
    (solutionRequests) => filterSolutionRequests(searchTerm, solutionRequests),
    [searchTerm],
  )

  return useDocuments(queryRef, filterFn)
}

export function generateQueryRef({
  startAfter,
  endBefore,
  limit,
  limitToLast
}) {
  const database = getDatabase()
  let queryRef = database
    .collection('solutionRequests')
    .orderBy('numberOfRequesters', 'desc')
  if (startAfter) {
    queryRef = queryRef.startAfter(startAfter)
  }
  if (endBefore) {
    queryRef = queryRef.endBefore(endBefore)
  }
  if (limit) {
    queryRef = queryRef.limit(limit)
  }
  if (limitToLast) {
    queryRef = queryRef.limitToLast(limitToLast)
  }
  return queryRef
}

export function filterSolutionRequests(searchTerm, solutionRequests) {
  if (searchTerm) {
    solutionRequests = solutionRequests.filter(
      partial(isSolutionRequestWhichIncludesSearchTerm, searchTerm),
    )
  }
  return solutionRequests
}
