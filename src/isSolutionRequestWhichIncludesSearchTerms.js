export function isSolutionRequestWhichIncludesSearchTerms(searchTerms, solutionRequest) {
  const { summary, details } = solutionRequest.data()
  return (
    summary.includes(searchTerms) ||
    details.includes(searchTerms)
  )
}
