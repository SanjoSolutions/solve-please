import React, { useCallback, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { isSearchEventSupported } from './isSearchEventSupported.js'
import { useSearchTerm } from './useSearchTerm.js'

export function Search() {
  const history = useHistory()

  const inputRef = useRef()

  const searchTerm = useSearchTerm()

  useEffect(
    function syncQuerySearchTermWithSearchInputValue() {
      const input = inputRef.current
      if (input) {
        input.value = searchTerm ?? ''
      }
    },
    [searchTerm]
  )

  const updateQueryString = useCallback(
    () => {
      const input = inputRef.current
      if (input) {
        const searchText = input.value
        let path = '/'
        if (searchText.length >= 1) {
          path += `?q=${ encodeURIComponent(searchText) }`
        }
        history.push(path)
      }
    },
    [history],
  )

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      if (inputRef.current && !isSearchEventSupported(inputRef.current)) {
        updateQueryString()
      }
    },
    [
      updateQueryString,
    ],
  )

  const onSearch = useCallback(
    () => {
      updateQueryString()
    },
    [updateQueryString],
  )

  const onInputAttached = useCallback(
    (node) => {
      inputRef.current = node
      if (isSearchEventSupported(node)) {
        node.addEventListener('search', onSearch)
      }
    },
    [onSearch],
  )

  return (
    <form onSubmit={ onSubmit } className="d-flex">
      <input
        ref={ onInputAttached }
        className="form-control me-2"
        type="search"
        title="Search for solution requests"
        placeholder="Search for solution requests"
        aria-label="Search"
        style={ { minWidth: '24rem' } }
        defaultValue={ searchTerm }
      />
      <button className="btn btn-outline-dark" type="submit">Search</button>
    </form>
  )
}
