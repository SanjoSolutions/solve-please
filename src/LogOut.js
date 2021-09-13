import React from 'react'
import { logOut } from './firebase/logOut.js'

export function LogOut() {
  return (
    <button
      onClick={logOut}
      className="btn btn-outline-dark ms-2"
      type="button"
    >
      Log out
    </button>
  )
}
