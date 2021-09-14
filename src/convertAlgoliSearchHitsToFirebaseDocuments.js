import { convertAlgoliSearchHitToFirebaseDocument } from './convertAlgoliSearchHitToFirebaseDocument.js'

export function convertAlgoliSearchHitsToFirebaseDocuments(hits) {
  return hits.hits.map(convertAlgoliSearchHitToFirebaseDocument)
}
