import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCjMMsX6upw-FyGq3KJm_0_gRqC0nR9NE0",
      authDomain: "nuxt-firebase-sample-bc4b4.firebaseapp.com",
      databaseURL: "https://nuxt-firebase-sample-bc4b4.firebaseio.com",
      projectId: "nuxt-firebase-sample-bc4b4",
      storageBucket: "nuxt-firebase-sample-bc4b4.appspot.com",
      messagingSenderId: "400312403376",
      appId: "1:400312403376:web:357a05b9449573a9054275"
    }
  )
}

export default firebase