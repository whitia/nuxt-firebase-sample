import { v4 as uuidv4 } from 'uuid';
import firebase from '~/plugins/firebase'
import 'firebase/storage'

const db = firebase.firestore()
const usersRef = db.collection('users')
const firestorage = firebase.storage()

export const state = () => ({
  auth: {
    uid: null,
    name: null
  },
  users: [],
  user: {
    id: '',
    name: {
      first: '',
      last: ''
    },
    age: ''
  }
})

export const actions = {
  login({ commit }) {
    return new Promise((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then(result => {
        commit('setAuth', result.user)
        resolve(true)
      })
      .catch(error => {
        console.error('An error occurred in login(): ', error)
        reject(error)
      })
    })
  },

  addUser({ commit }, payload) {
    const user = {
      id: payload.user.id,
      name: payload.user.name,
      age: payload.user.age,
      avatar: payload.user.avatar,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }
  
    return new Promise((resolve, reject) => {
      usersRef.add(user)
      .then(ref => {
        resolve(true)
      })
      .catch(error => {
        console.error('An error occurred in addUser(): ', error)
        reject(error)
      })
    })
  },

  fetchUsers({ commit }) {
    commit('initUsers')

    return new Promise((resolve, reject) => {
      usersRef.orderBy('created_at', 'desc').get()
      .then(res => {
        res.forEach((doc) => {
          commit('addUsers', doc.data())
          resolve(true)
        })
      })
      .catch(error => {
        console.error('An error occurred in fetchUsers(): ', error)
        reject(error)
      })
    })
  },

  fetchUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      usersRef.where('id', '==', payload.id).get()
      .then(res => {
        res.forEach((doc) => {
          commit('addUser', doc.data())
          resolve(true)
        })
      })
      .catch(error => {
        console.error('An error occurred in fetchUsers(): ', error)
        reject(error)
      })
    })
  },

  editUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      usersRef.where('id', '==', payload.user.oldId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const user = {
            id: payload.user.newId,
            name: payload.user.name,
            age: payload.user.age,
            avatar: payload.user.avatar,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
          }
  
          usersRef.doc(doc.id).update(user)
          .then(ref => {
            resolve(true)
          })
          .catch(error => {
            console.error('An error occurred in editUser(): ', error)
            resolve(error)
          })
        })
      })
    })
  },

  deleteUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      usersRef.where('id', '==', payload.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          usersRef.doc(doc.id).delete()
          .then(ref => {
            resolve(true)
          })
          .catch(error => {
            console.error('An error occurred in deleteUser(): ', error)
            reject(error)
          })
        })
      })
    })
  },

  uploadFile({ commit }, payload) {
    const name = uuidv4()

    return new Promise((resolve, reject) => {
      firestorage.ref('images/' + name).put(payload.file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(url => {
          resolve({ name, url })
        })
      })
      .catch(error => {
        console.error('An error occurred in uploadFile(): ', error)
        reject(error)
      })
    })
  },

  deleteFile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firestorage.ref('images/').child(payload.name).delete()
      .then(() => {
        resolve(true)
      })
      .catch(error => {
        console.log('An error occurred in deleteFile(): ', error)
        reject(error)
      })
    })
  }
}

export const mutations = {
  setAuth(state,auth) {
    state.auth.uid = auth.uid
    state.auth.name = auth.displayName
  },

  initUsers(state) {
    state.users = []
  },

  addUsers(state, users) {
    state.users.push(users)
  },

  addUser(state, user) {
    state.user = user
  }
}

export const getters = {
  getAuth(state) {
    return state.auth
  },

  getUsers(state) {
    return state.users
  },

  getUser(state) {
    return state.user
  }
}