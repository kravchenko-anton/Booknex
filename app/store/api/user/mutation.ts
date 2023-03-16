import NetInfo from '@react-native-community/netinfo'
import { signInWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { auth, db } from '../../../utils/firebase'
import { api } from '../api'

const userMutationApi = api.injectEndpoints({
	endpoints: build => ({
		// remove	user from the favorite list
		removeUserToFavorite: build.mutation({
			async queryFn({ currentUserUID, favoriteUser }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' removeUserToFavorite Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('removeUserToFavorite Work')
						const reference = doc(db, 'users', currentUserUID)
						await updateDoc(reference, {
							favoritesUser: arrayRemove(favoriteUser)
						})
						Toast.show({
							text1: I18n.t('UserRemoveFromFavorite'),
							type: 'success'
						})
						return { data: 'ok' }
					}
				} catch (error) {
					Toast.show({
						text1: I18n.t('Something went wrong'),
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addUserToFavorite Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addUserToFavorite Work')
						const reference = doc(db, 'users', currentUserUID)
						await updateDoc(reference, {
							favoritesUser: arrayUnion(favoriteUser)
						})
						Toast.show({
							text1: I18n.t('You add user to favorites'),
							type: 'success'
						})
						return { data: 'ok' }
					}
				} catch (error) {
					Toast.show({
						text1: I18n.t('Something went wrong'),
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' UpdateProfile Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('UpdateProfile Work')
						await signInWithEmailAndPassword(auth, oldEmail, ConfirmPassword).then(
							function(userCredential) {
								updateEmail(userCredential.user, email)
							}
						)
						const reference = doc(db, 'users', uid)
						await updateDoc(reference, {
							name: name,
							email: email,
							photoURL: photoURL
						})
						Toast.show({
							text1: I18n.t('Success update profile'),
							type: 'success'
						})
						return { data: 'ok' }
					}
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: I18n.t('Something went wrong'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		UpdatePassword: build.mutation({
			async queryFn({ OldPassword, NewPassword, email }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' UpdatePassword Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('UpdatePassword Work')
						await signInWithEmailAndPassword(auth, email, OldPassword).then(function(
							userCredential
						) {
							updatePassword(userCredential.user, NewPassword)
						})
						Toast.show({
							text1: I18n.t('Success update password'),
							type: 'success'
						})
						return { data: 'ok' }
					}
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: I18n.t('Something went wrong'),
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
	useUpdatePasswordMutation
} = userMutationApi
