import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import { SolutionRequest } from './SolutionRequest.js'
import { Spinner } from './Spinner.js'
import { first } from './unnamed/packages/array/src/first.js'
import { last } from './unnamed/packages/array/src/last.js'
import { retrieveDocuments } from './unnamed/react/firebase/useDocuments.js'
import { useSearchTerms } from './useSearchTerms.js'
import { generateQueryRef } from './useSolutionRequests.js'

export function SolutionRequests() {
  const searchTerms = useSearchTerms()
  const itemsPerPage = 20
  const [previousSolutionRequests, setPreviousSolutionRequests] = useState(null)
  const [solutionRequests, setSolutionRequests] = useState(null)
  const [nextSolutionRequests, setNextSolutionRequests] = useState(null)

  useEffect(
    function retrieveDisplayedPage() {
      async function retrieve() {
        setSolutionRequests(null)
        const queryRef = generateQueryRef(
          {
            searchTerms,
            limit: itemsPerPage,
          },
        )
        const documents = await retrieveDocuments(queryRef)
        setSolutionRequests(documents)
      }

      retrieve()
    },
    [searchTerms],
  )

  useEffect(
    function retrieveNextPage() {
      if (solutionRequests && !nextSolutionRequests) {
        async function retrieve() {
          const queryRef = generateQueryRef(
            {
              searchTerms,
              startAfter: last(solutionRequests),
              limit: itemsPerPage,
            },
          )
          const documents = await retrieveDocuments(queryRef)
          setNextSolutionRequests(documents)
        }

        retrieve()
      }
    },
    [
      solutionRequests,
      nextSolutionRequests,
      searchTerms,
    ],
  )

  useEffect(
    function retrievePreviousPage() {
      if (solutionRequests && !previousSolutionRequests) {
        async function retrieve() {
          const queryRef = generateQueryRef(
            {
              searchTerms,
              endBefore: first(solutionRequests),
              limitToLast: itemsPerPage,
            },
          )
          const documents = await retrieveDocuments(queryRef)
          setPreviousSolutionRequests(documents)
        }

        retrieve()
      }
    },
    [
      solutionRequests,
      previousSolutionRequests,
      searchTerms,
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
                    link={true}
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
          <Spinner />
      }
    </div>
  )
}
