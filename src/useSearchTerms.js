import { useQuery } from './unnamed/react/useQuery.js'

export function useSearchTerms() {
  const query = useQuery()
  const searchTerms = query.get('q')
  return searchTerms
}
