import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
	getReactNativePersistence,
	initializeAuth
} from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDQMGETJt4y9-beaw4EMRBQp53jimFNuFw',
	authDomain: 'ntbook-eed11.firebaseapp.com',
	projectId: 'ntbook-eed11',
	storageBucket: 'ntbook-eed11.appspot.com',
	messagingSenderId: '211267715326',
	appId: '1:211267715326:web:be4c607d05d94af911a5af',
	measurementId: 'G-055NZBC83H'
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
