import React from 'react'
import { Link } from 'react-router-dom'

export function LogIn() {
  return (
    <Link
      to="/log-in"
      className="btn btn-outline-dark ms-2"
    >
      Log in
    </Link>
  )
}
