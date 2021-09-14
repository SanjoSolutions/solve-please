import React from 'react'

export function Spinner() {
  return (
    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
