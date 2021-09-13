import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from './useUser.js'

export function useRequireLoggedIn() {
  const user = useUser()
  const history = useHistory()

  useEffect(
    () => {
      if (!user) {
        history.replace('/log-in', {
          redirectToAfterLogin: history.location.pathname
        })
      }
    },
    [
      user,
      history,
    ],
  )
}
