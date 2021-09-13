import { useState, useEffect } from 'react'
import { getDatabase } from './firebase/getDatabase.js'

export function useRequests() {
  const [requests, setRequests] = useState([])

  useEffect(
    () => {
      async function retrieveSolutionRequests() {
        const database = getDatabase()
        const solutionRequests = await database.collection('solutionRequests')
          .get(
            database.collection('solutionRequests')
              .orderBy('numberOfRequesters', 'desc'),
          )
        setRequests(solutionRequests.docs)
      }
      retrieveSolutionRequests()
    },
    []
  )

  return requests
}
