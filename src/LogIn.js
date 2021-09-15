import React from 'react'
import { Link } from 'react-router-dom'

export function LogIn() {
  return (
    <Link
      to="/log-in"
      className="btn btn-outline-dark mt-3 mb-2 mt-lg-0 ms-lg-2 mb-lg-0"
    >
      Log in
    </Link>
  )
}
