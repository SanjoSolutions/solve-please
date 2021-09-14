import { useMemo } from 'react'
import { getDatabase } from './unnamed/firebase/getDatabase.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionRequests({
  searchTerm,
  startAfter,
  endBefore,
  limit,
  limitToLast,
}) {
  const queryRef = useMemo(
    () => generateQueryRef({
      searchTerm,
      startAfter,
      endBefore,
      limit,
      limitToLast,
    }),
    [
      searchTerm,
      startAfter,
      endBefore,
      limit,
      limitToLast,
    ],
  )

  return useDocuments(queryRef)
}

export function generateQueryRef({
  searchTerm,
  startAfter,
  endBefore,
  limit,
  limitToLast,
}) {
  const database = getDatabase()
  let queryRef = database
    .collection('solutionRequests')
    .orderBy('numberOfRequesters', 'desc')
  if (searchTerm) {
    queryRef = queryRef.where(
      'summaryWords',
      'array-contains-any',
      searchTerm.split(' ').slice(0, 10),
    )
  }
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
