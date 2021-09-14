import { useQuery } from './unnamed/react/useQuery.js'

export function useSearchTerm() {
  const query = useQuery()
  const searchTerm = query.get('q')
  return searchTerm
}
