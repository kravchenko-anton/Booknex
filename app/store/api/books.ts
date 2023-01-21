import { arrayRemove, arrayUnion,  collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { db } from '../../utils/firebase'
import { api } from './api'
import { BookTypes } from './api.types'

const  bookApi = api.injectEndpoints({
	endpoints: (build) => ({
		
		// Fetch all book
		fetchBooks: build.query({
			async queryFn() {
				try {
					const blogRef = collection(db, 'book')
					const querySnaphot = await getDocs(blogRef)
					let books: BookTypes[] = []
					querySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		//Fetch sungle book
		fetchSingleBook: build.query({
			async queryFn(id) {
				try {
					const docRef = doc(db, 'book', id)
					const snapshot = await getDoc(docRef)
					return { data: { id, ...snapshot.data() } as BookTypes }
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		// add Book to Favorite
		addBookToFavorite: build.mutation({
			async queryFn({ currentUserUID, book }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						favoritesBook: arrayUnion(book)
					})
					Toast.show({
						text1: 'You add book to favorites!',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error) {
					Toast.show({
						text1: 'Yo book not added to favorites!',
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		
		// add userBook
		addUserBook: build.mutation({
			async queryFn({ UserId, BookData }) {
				try {
					const reference = doc(db, 'users', UserId)
					await updateDoc(reference, {
						BookData: arrayUnion(BookData)
					})
					Toast.show({
						text1: 'You add book to favorites!',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error) {
					Toast.show({
						text1: 'Yo book not added to favorites!',
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		// delete book
		deleteBookFromFavorite: build.mutation({
			async queryFn({ currentUserUID, book }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						favoritesBook: arrayRemove(book)
					})
					Toast.show({
						text1: 'You book remove from favorites!',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error) {
					Toast.show({
						text1: 'You  book not remove from favorites!',
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
	useDeleteBookFromFavoriteMutation,
	useFetchSingleBookQuery,
	useAddBookToFavoriteMutation,
	useFetchBooksQuery
} = bookApi