import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import { Auth } from './Auth.js'
import { LogIn } from './LogIn.js'
import { LogOut } from './LogOut.js'
import { ProposeSolution } from './ProposeSolution.js'
import { RequestSolution } from './RequestSolution.js'
import { Search } from './Search.js'
import { SolutionRequestPage } from './SolutionRequestPage.js'
import { SolutionRequests } from './SolutionRequests.js'
import { useIsInitializing } from './unnamed/react/firebase/useIsInitializing.js'
import { useUser } from './unnamed/react/firebase/useUser.js'

function App() {
  const isInitializing = useIsInitializing()
  const user = useUser()

  const location = useLocation()

  const isCurrentLocationPath = useCallback(
    function (path) {
      return path === location.pathname
    },
    [location],
  )

  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = useCallback(
    function () {
      setIsOpen(!isOpen)
    },
    [isOpen],
  )

  return (
    <div className="d-flex flex-column flex-grow-1">
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light mb-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Solve please</a>
          <button
            onClick={ toggleCollapse }
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={ classNames({
              'collapse': !isOpen,
              'show': isOpen,
              'navbar-collapse': true,
            }) }
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    classNames({
                      'nav-link': true,
                      'active': isCurrentLocationPath('/'),
                    })
                  }
                  aria-current="page"
                  to="/"
                >Solution requests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    classNames({
                      'nav-link': true,
                      'active': isCurrentLocationPath('/request-solution'),
                    })
                  }
                  to="/request-solution"
                >
                  Request a solution
                </Link>
              </li>
            </ul>
            <Search />
            { isInitializing ? null : (user ? <LogOut /> : <LogIn />) }
          </div>
        </div>
      </nav>
      <div className="container flex-grow-1 d-flex flex-column">
        <Switch>
          <Route exact path="/">
            <SolutionRequests />
          </Route>
          <Route exact path="/solution-requests/:id">
            <SolutionRequestPage />
          </Route>
          <Route exact path="/log-in">
            <Auth />
          </Route>
          <Route exact path="/request-solution">
            <RequestSolution />
          </Route>
        </Switch>
      </div>
      <ProposeSolution />
    </div>
  )
}

export default App
