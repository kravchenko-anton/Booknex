
import firebase from 'firebase/compat'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { getAuth, updatePassword, signInWithEmailAndPassword, updateEmail, updateProfile } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { auth, db } from '../../../utils/firebase'
import { api } from '../api'
import { Iuser } from '../api.types'

const userMutationApi = api.injectEndpoints({
	endpoints: build => ({
		
		removeUserToFavorite: build.mutation({
			async queryFn({ currentUserUID, favoriteUser }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						favoritesUser: arrayRemove(favoriteUser)
					})
					Toast.show({
						text1: 'You add user to favorites',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error) {
					Toast.show({
						text1: 'Yo user not added to favorites!',
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		addUserToFavorite: build.mutation({
			async queryFn({ currentUserUID, favoriteUser }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						favoritesUser: arrayUnion(favoriteUser)
					})
					Toast.show({
						text1: 'You add user to favorites',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error) {
					Toast.show({
						text1: 'Yo user not added to favorites!',
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		
		UpdateProfile: build.mutation({
			async queryFn({ name, email, photoURL, uid, oldEmail, ConfirmPassword }) {
				try {
				 await	signInWithEmailAndPassword(auth, oldEmail, ConfirmPassword)
						.then(function(userCredential) {
							updateEmail(userCredential.user, email)
						})
					const reference = doc(db, 'users', uid)
					await updateDoc(reference, {
						name: name,
						email: email,
						photoURL: photoURL,
					})
		
					Toast.show({
						text1: 'Success update profile',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: 'You not update profile!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		UpdatePassword: build.mutation({
			async queryFn({  OldPassword, NewPassword, email }) {
				try {
					
					await	signInWithEmailAndPassword(auth, email, OldPassword)
						.then(function(userCredential) {
							updatePassword(userCredential.user, NewPassword)
						})
				
					Toast.show({
						text1: 'Success update password',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: 'You not update password!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		})
		
		
		
		
	})
})
export const {
	useAddUserToFavoriteMutation,
	useRemoveUserToFavoriteMutation,
useUpdateProfileMutation,
	useUpdatePasswordMutation,
} = userMutationApi
