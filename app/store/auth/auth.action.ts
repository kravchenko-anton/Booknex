import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { auth, db } from '../../utils/firebase'
import { IAuthFields } from './auth.interface'


export const register = createAsyncThunk<any, IAuthFields>(
	'auth/register', async ({ email, password }, thunkAPI) => {
		try {
			// TODO: Сделать загрузку юзера в стор ток с нужными полями в setDoc
			const user = await createUserWithEmailAndPassword(auth, email, password)
			Toast.show({
				text1: 'Success!',
				text2: 'You login success!',
				type: 'success'
			})
			await setDoc(doc(db, 'users', user.user.uid), {
				uid: user.user.uid,
				email: user.user.email,
				name: user.user.displayName,
				photoURL: user.user.photoURL,
				createAt: user.user.metadata.lastSignInTime,
				booksCount: 0,
				revieCount: 0,
				userBooks: [],
				favoritesBook: [],
				favoritesUser: []
			})
			return { user }
		} catch (error: any) {
			Toast.show({
				text1: 'Error!',
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
				text1: 'Success!',
				text2: 'You login success!',
				type: 'success'
			})
			
			return { user }
		} catch (error: any) {
			Toast.show({
				text1: 'Error!',
				text2: error.message,
				type: 'error'
			})
			return thunkAPI.rejectWithValue(error)
		}
	}
)


export const logout = createAsyncThunk<any, IAuthFields>(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			await signOut(auth).then(() => {
				console.log('Logout succes')
			})
		} catch (e) {
			console.log(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)