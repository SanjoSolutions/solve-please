import { useMemo } from 'react'
import { getDatabase } from './unnamed/firebase/compat/getDatabase.js'
import { useDocuments } from './unnamed/react/firebase/useDocuments.js'

export function useSolutionRequests({
  searchTerms,
  startAfter,
  endBefore,
  limit,
  limitToLast,
}) {
  const queryRef = useMemo(
    () => generateQueryRef({
      searchTerms,
      startAfter,
      endBefore,
      limit,
      limitToLast,
    }),
    [
      searchTerms,
      startAfter,
      endBefore,
      limit,
      limitToLast,
    ],
  )

  return useDocuments(queryRef)
}

export function generateQueryRef({
  searchTerms,
  startAfter,
  endBefore,
  limit,
  limitToLast,
}) {
  const database = getDatabase()
  let queryRef = database
    .collection('solutionRequests')
  if (searchTerms) {
    queryRef = queryRef.where(
      'summaryAndDetailsWords',
      'array-contains-any',
      searchTerms.split(' ').slice(0, 10),
    )
  }
  queryRef = queryRef.orderBy('numberOfRequesters', 'desc')
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
