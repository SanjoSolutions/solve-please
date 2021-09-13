import querystring from 'querystring'
import { useLocation } from 'react-router-dom'

export function useSearchTerm() {
  const location = useLocation()
  const query = querystring.parse(location.search.substr(1))
  const searchTerm = query.q
  return searchTerm
}
