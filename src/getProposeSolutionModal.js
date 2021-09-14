/* globals bootstrap */

export function getProposeSolutionModal() {
  const proposeSolutionModal = document.getElementById('proposeSolution')
  const modal = bootstrap.Modal.getOrCreateInstance(proposeSolutionModal)
  return modal
}
