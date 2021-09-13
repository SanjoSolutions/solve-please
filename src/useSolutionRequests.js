import { useState, useEffect } from 'react'
import { getDatabase } from './firebase/getDatabase.js'

export function useSolutionRequests(searchTerm) {
  const [requests, setRequests] = useState(null)

  useEffect(
    () => {
      async function retrieveSolutionRequests() {
        const database = getDatabase()
        const solutionRequestsResult = await database
          .collection('solutionRequests')
          .get(
            database.collection('solutionRequests')
              .orderBy('numberOfRequesters', 'desc'),
          )
        let solutionRequests = solutionRequestsResult.docs
        if (searchTerm) {
          solutionRequests = solutionRequests.filter(
            solutionRequest => {
              const {summary, details} = solutionRequest.data()
              return (
                summary.includes(searchTerm) ||
                details.includes(searchTerm)
              )
            }
          )
        }
        setRequests(solutionRequests)
      }
      retrieveSolutionRequests()
    },
    [searchTerm]
  )

  return requests
}
