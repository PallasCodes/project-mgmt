import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAYUPJPS1S3OVenKyc6OjKw39o5lCMj-lM',
  authDomain: 'dojo-2f5e6.firebaseapp.com',
  projectId: 'dojo-2f5e6',
  storageBucket: 'dojo-2f5e6.appspot.com',
  messagingSenderId: '567484129299',
  appId: '1:567484129299:web:ce235c723e0c292e049fe6',
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
