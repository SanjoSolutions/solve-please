import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { SolutionRequest } from './SolutionRequest.js'
import { first } from './unnamed/packages/array/src/first.js'
import { last } from './unnamed/packages/array/src/last.js'
import { partial } from './unnamed/partial.js'
import { retrieveDocuments } from './unnamed/react/firebase/useDocuments.js'
import { useSearchTerm } from './useSearchTerm.js'
import { filterSolutionRequests, generateQueryRef } from './useSolutionRequests.js'

export function SolutionRequests() {
  const searchTerm = useSearchTerm()
  const itemsPerPage = 20
  const [previousSolutionRequests, setPreviousSolutionRequests] = useState(null)
  const [solutionRequests, setSolutionRequests] = useState(null)
  const [nextSolutionRequests, setNextSolutionRequests] = useState(null)

  useEffect(
    function retrieveInitialPage() {
      async function retrieve() {
        console.log('A')
        const queryRef = generateQueryRef(
          {
            limit: itemsPerPage,
          },
        )
        const filterFn = partial(filterSolutionRequests, searchTerm)
        const documents = await retrieveDocuments(
          queryRef,
          filterFn,
        )
        setSolutionRequests(documents)
      }

      retrieve()
    },
    [searchTerm],
  )

  useEffect(
    function retrieveNextPage() {
      if (solutionRequests && !nextSolutionRequests) {
        async function retrieve() {
          const queryRef = generateQueryRef(
            {
              searchTerm,
              startAfter: last(solutionRequests),
              limit: itemsPerPage,
            },
          )
          const filterFn = partial(filterSolutionRequests, searchTerm)
          const documents = await retrieveDocuments(
            queryRef,
            filterFn,
          )
          setNextSolutionRequests(documents)
        }

        retrieve()
      }
    },
    [
      solutionRequests,
      nextSolutionRequests,
      searchTerm,
    ],
  )

  useEffect(
    function retrievePreviousPage() {
      if (solutionRequests && !previousSolutionRequests) {
        async function retrieve() {
          const queryRef = generateQueryRef(
            {
              searchTerm,
              endBefore: first(solutionRequests),
              limitToLast: itemsPerPage,
            },
          )
          const filterFn = partial(filterSolutionRequests, searchTerm)
          const documents = await retrieveDocuments(
            queryRef,
            filterFn,
          )
          setPreviousSolutionRequests(documents)
        }

        retrieve()
      }
    },
    [
      solutionRequests,
      previousSolutionRequests,
      searchTerm,
    ],
  )

  const onNext = useCallback(
    () => {
      setPreviousSolutionRequests(solutionRequests)
      setSolutionRequests(nextSolutionRequests)
      setNextSolutionRequests(null)
    },
    [
      solutionRequests,
      nextSolutionRequests,
    ],
  )

  const onPrevious = useCallback(
    () => {
      setPreviousSolutionRequests(null)
      setSolutionRequests(previousSolutionRequests)
      setNextSolutionRequests(solutionRequests)
    },
    [
      solutionRequests,
      previousSolutionRequests,
    ],
  )

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <h1 className="h2">Solution requests</h1>

      {
        solutionRequests ?
          <div>
            {
              solutionRequests.map(
                solutionRequest =>
                  <SolutionRequest
                    key={ solutionRequest.id }
                    solutionRequest={ solutionRequest }
                  />,
              )
            }
            <nav aria-label="pagination">
              <ul className="pagination justify-content-center">
                <li
                  className={
                    classNames({
                      'page-item': true,
                      disabled: !previousSolutionRequests ||
                        previousSolutionRequests.length === 0,
                    })
                  }
                >
                  <button
                    onClick={ onPrevious }
                    className="page-link"
                  >
                    Previous page
                  </button>
                </li>
                <li
                  className={
                    classNames({
                      'page-item': true,
                      disabled: !nextSolutionRequests ||
                        nextSolutionRequests.length === 0,
                    })
                  }
                >
                  <button
                    onClick={ onNext }
                    className="page-link"
                  >
                    Next page
                  </button>
                </li>
              </ul>
            </nav>

          </div> :
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
      }
    </div>
  )
}
