export function convertAlgoliSearchHitToFirebaseDocument(hit) {
  return {
    id: hit.objectID,
    data() {
      return hit
    }
  }
}
