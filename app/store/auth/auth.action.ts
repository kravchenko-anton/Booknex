import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { db } from '../../utils/firebase'
import { auth } from './../../utils/firebase'
import { IAuthFields } from './auth.interface'

export const register = createAsyncThunk<any, IAuthFields>(
	'auth/register',
	async ({ email, password }, thunkAPI) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password)
			Toast.show({
				text1: I18n.t('Success'),
				type: 'success'
			})
			await setDoc(doc(db, 'users', user.user.uid), {
				uid: user.user.uid,
				email: user.user.email,
				name: user.user.email?.split('@')[0],
				photoURL: user.user.photoURL,
				createAt: user.user.metadata.lastSignInTime,
				revieCount: 0,
				favoritesBook: [],
				startReadBook: [],
				finishedBook: [],
				favoritesUser: []
			})
			return { user }
		} catch (error: any) {
			Toast.show({
				text1: I18n.t('Error'),
				text2: error.message,
				type: 'error'
			})
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<any, IAuthFields>(
	'auth/login',
	async ({ email, password }, thunkAPI) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password)
			Toast.show({
				text1 : I18n.t('Success'),
				type: 'success'
			})

			return { user }
		} catch (error: any) {
			Toast.show({
				text1: I18n.t('Error'),
				text2: error.message,
				type: 'error'
			})
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk<any, null>(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			await signOut(auth).then(() => {
			})
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)
