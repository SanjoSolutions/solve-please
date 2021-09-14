export function isSolutionRequestWhichIncludesSearchTerm(searchTerm, solutionRequest) {
  const { summary, details } = solutionRequest.data()
  return (
    summary.includes(searchTerm) ||
    details.includes(searchTerm)
  )
}
