import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { db } from '../../utils/firebase'
import { api } from './api'
import { Iuser } from './api.types'

const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		
		fetchUser: build.query({
			async queryFn() {
				try {
					const blogRef = collection(db, 'users')
					const querySnaphot = await getDocs(blogRef)
					let user: Iuser[] = []
					querySnaphot?.forEach((doc) => {
						// @ts-ignore
						user.push({ uid: doc.id, ...doc.data() })
					})
					return { data: user }
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		}),
		
		
		fetchSingleUser: build.query({
			async queryFn(uid) {
				try {
					const docRef = doc(db, 'users', uid)
					const snapshot = await getDoc(docRef)
					return { data: { uid, ...snapshot.data() } as Iuser }
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		}),
		
		fetchMyProfile: build.query({
			async queryFn(uid) {
				try {
					const docRef = doc(db, 'users', uid)
					const snapshot = await getDoc(docRef)
					return { data: { uid, ...snapshot.data() } as Iuser }
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		}),
		
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
	useFetchSingleUserQuery,
	useFetchMyProfileQuery,
	useFetchUserQuery
} = userApi