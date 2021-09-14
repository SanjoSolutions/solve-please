import algoliasearch from 'algoliasearch'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { convertAlgoliSearchHitsToFirebaseDocuments } from './convertAlgoliSearchHitsToFirebaseDocuments.js'
import { SolutionRequest } from './SolutionRequest.js'
import { Spinner } from './Spinner.js'
import { useSearchTerm } from './useSearchTerm.js'

const client = algoliasearch('<APP ID>', '<API KEY>')
const index = client.initIndex('solutionRequests')

async function search(searchTerm) {
  const hits = await index.search(searchTerm)
  return hits
}

window.search = search

export function SearchPage() {
  const searchTerm = useSearchTerm()
  const [solutionRequests, setSolutionRequests] = useState(null)

  useEffect(
    () => {
      async function retrieve() {
        const hits = await search(searchTerm)
        setSolutionRequests(convertAlgoliSearchHitsToFirebaseDocuments(hits))
      }

      retrieve()
    },
    [
      searchTerm
    ]
  )

  return (
    <div className="flex-grow-1 d-flex flex-column">
      <h1 className="h2">Solution requests search result</h1>

      {
        solutionRequests ?
          <div>
            {
              solutionRequests.map(
                solutionRequest =>
                  <SolutionRequest
                    key={ solutionRequest.id }
                    solutionRequest={ solutionRequest }
                    link={ true }
                  />,
              )
            }
            {/*
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
            */}
          </div> :
          <Spinner />
      }
    </div>
  )
}
