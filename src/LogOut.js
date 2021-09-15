import React from 'react'
import { logOut } from './unnamed/firebase/logOut.js'

export function LogOut() {
  return (
    <button
      onClick={logOut}
      className="btn btn-outline-dark mt-3 mb-2 mt-lg-0 ms-lg-2 mb-lg-0"
      type="button"
    >
      Log out
    </button>
  )
}
