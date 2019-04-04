import EventEmitter from 'eventemitter3'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import sha1 from 'sha1'

import { changeUser, logOutUser } from 'actions/User'
import FirebaseConfig from 'api/FirebaseConfig'
import store from 'common/Store'

export const getKey = () => {
  let currentDate = (new Date()).valueOf().toString()
  let random = Math.random().toString()
  return sha1(currentDate + random)
}

/**
 * An EventEmitter-based database that wraps a connection to the old-school
 * firebase datastore
 */
class Database extends EventEmitter {
  constructor () {
    super()
    this.emitEvent = {}
    this.unsubscribeEvents = {}

    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig)
    }
    firebase.auth().onAuthStateChanged(this._onSetUser)

    this.firestore = firebase.firestore()
    this._onSetUser(this.getUser())
  }

  _onSetUser = async user => {
    if (!user) {
      store.dispatch(logOutUser(user))
    } else {
      const authorizedEmails = [
        'psl.com',
        'pioneersquarelabs.com'
      ]
      let valid = authorizedEmails
        .map(e => user.email.endsWith(e))
        .reduce((acc, val) => acc || val, false)
      if (valid) {
        store.dispatch(changeUser(user))
      } else {
        store.dispatch(logOutUser(user))
      }
    }
  }

  login () {
    let provider = new firebase.auth.GoogleAuthProvider()
    let self = this
    firebase.auth()
      .signInWithPopup(provider)
      .catch(error => {
        console.log(error)
        self.emit(error)
      })
  }

  async logout () {
    await firebase.auth().signOut()
  }

  getUser () {
    return firebase.auth().currentUser
  }

  getUserData = async () => {
    let doc = await this.firestore
      .collection('users')
      .doc(this.getUser().uid)
      .get()
    return doc.data()
  }

  setDataListener (key, ref, onUpdate) {
    let k = key + ref
    this.addListener(k, onUpdate)
    this.emitEvent[k] = (doc) => this.emit(k, doc.data())
    this.unsubscribeEvents[k] = this.firestore.collection(ref).onSnapshot(this.emitEvent[k])
  }

  clearDataListener (key, ref, onUpdate) {
    let k = key + ref
    this.removeListener(k, onUpdate)
    delete this.emitEvent[k]
    this.unsubscribeEvents[k]()
    delete this.unsubscribeEvents[k]
  }

  // Saves a unique entry e.g. a tag in a table of our choice
  async saveUniqueItem (name, collection) {
    let query = await this.firestore.collection(collection).where('name', '==', name).get()
    if (query.empty) {
      this.firestore.collection(collection).doc(name).set({ name, hidden: false })
    } else {
      query.docs.forEach(doc => {
        let { name, hidden } = doc.data()
        if (hidden) {
          this.firestore.collection(collection).doc(name).update({ hidden: false })
        }
      })
    }
  }

  async deleteUniqueItem (name, collection) {
    await this.firestore.collection(collection).doc(name).update({ hidden: true })
  }
}

// Create database eagerly
var INSTANCE = new Database()
export const getDatabase = () => INSTANCE
