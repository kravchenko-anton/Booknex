import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
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
		})

	})
})
export const {
	useAddUserToFavoriteMutation,
	useRemoveUserToFavoriteMutation,

} = userMutationApi
