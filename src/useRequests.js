import firebase from 'firebase'
import 'firebase/firestore'
import { useState, useEffect } from 'react'

export function useRequests() {
  const [requests, setRequests] = useState([])

  useEffect(
    async () => {
      const database = firebase.firestore()
      const solutionRequests = await database.collection('solutionRequests')
        .get(
          database.collection('solutionRequests')
            .orderBy('numberOfRequesters', 'desc'),
        )
      setRequests(solutionRequests.docs)
    },
    []
  )

  return requests
}
