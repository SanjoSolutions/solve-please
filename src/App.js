import React, { useCallback, useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom'
import './App.css'
import { SolutionRequests } from './SolutionRequests.js'
import { RequestSolution } from './RequestSolution.js'
import classNames from 'classnames'
import { useUser } from './useUser.js'

function App() {
  const user = useUser()

  const location = useLocation()

  const isCurrentLocationPath = useCallback(
    function (path) {
      return path === location.pathname
    },
    [location]
  )

  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = useCallback(
    function () {
      setIsOpen(!isOpen)
    },
    [isOpen]
  )

  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light mb-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Solve please</a>
          <button
            onClick={toggleCollapse}
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"/>
          </button>
          <div className={classNames({
            'collapse': !isOpen,
            'show': isOpen,
            'navbar-collapse': true
          })}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    classNames({
                      'nav-link': true,
                      'active': isCurrentLocationPath('/')
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
                      'active': isCurrentLocationPath('/request-solution')
                    })
                  }
                  to="/request-solution"
                >
                  Request a solution
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for solution requests"
                aria-label="Search"
              />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container">
        {!user && <div id="firebaseui-auth-container"/>}

        <Switch>
          <Route exact path="/">
            <SolutionRequests />
          </Route>
          <Route exact path="/request-solution">
            <RequestSolution />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
