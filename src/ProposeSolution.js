import React, { useCallback } from 'react'
import { getProposeSolutionModal } from './getProposeSolutionModal.js'
import { getSolutionProposalsCollection } from './getSolutionProposalsCollection.js'

export function ProposeSolution() {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      async function submit() {
        const solution = document.getElementById('solution').value
        const solutionRequestId = sessionStorage.getItem('solutionRequestId')
        await getSolutionProposalsCollection(solutionRequestId)
          .add(
            {
              solution,
            },
          )
        const modal = getProposeSolutionModal()
        modal.hide()
      }

      submit()
    },
    [],
  )

  return (
    <div id="proposeSolution" className="modal" tabIndex={ -1 }>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={ onSubmit }>
            <div className="modal-header">
              <h5 className="modal-title">Propose solution</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="solution" className="form-label">Solution</label>
                <textarea className="form-control" id="solution" rows={ 5 }/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Propose solution</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
