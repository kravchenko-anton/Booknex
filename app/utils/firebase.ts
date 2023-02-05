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
	apiKey: 'XXXXXXXX',
	authDomain: 'XXXXXXXX',
	projectId: 'XXXXXXXX',
	storageBucket: 'XXXXXXXX',
	messagingSenderId: 'XXXXXXXX',
	appId: '1:XXXXXXXX:web:XXXXXXXX',
	measurementId: 'G-XXXXXXXX'
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
