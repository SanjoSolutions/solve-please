import firebase from 'firebase/app'
import 'firebase/auth'

export async function logOut() {
  const auth = firebase.auth()
  await auth.signOut()
}
