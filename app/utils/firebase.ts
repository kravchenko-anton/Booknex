import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
