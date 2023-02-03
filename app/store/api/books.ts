import firebase from 'firebase/compat'
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where
} from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { db } from '../../utils/firebase'
import { api } from './api'
import { BookTypes } from './api.types'

const bookApi = api.injectEndpoints({
	endpoints: (build) => ({
		
		// Fetch appBooks book
		fetchBooks: build.query({
			async queryFn() {
				try {
					const blogRef = collection(db, 'books')
					const querySnaphot = await getDocs(blogRef)
					let books: BookTypes[] = []
					querySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: 'Book not loaded!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		// Fetch CurrentUserBooks
		fetchCurrentUserBooks: build.query({
			async queryFn(AutorName) {
				try {
					const q = query(collection(db, 'userBook'), where('autor', 'array-contains', AutorName))
					const querySnaphot = await getDocs(q)
					let books: BookTypes[] = []
					querySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error: any) {
					console.log(error)
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		//Fetch horror  book
		fetchHorrorBooks: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const uq = query(userBookRef, where('genre', 'array-contains', 'Horror'))
					const booksRef = collection(db, 'books')
					const bq = query(booksRef, where('genre', 'array-contains', 'Horror'))
					const UserquerySnaphot = await getDocs(uq)
					const BooksquerySnaphot = await getDocs(bq)
					let books: BookTypes[] = []
					UserquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: 'Book not loaded!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		//Fetch Action  book
		fetchActionBooks: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const uq = query(userBookRef, where('genre', 'array-contains', 'Action'))
					const booksRef = collection(db, 'books')
					const bq = query(booksRef, where('genre', 'array-contains', 'Action'))
					const UserquerySnaphot = await getDocs(uq)
					const BooksquerySnaphot = await getDocs(bq)
					let books: BookTypes[] = []
					UserquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: 'Book not loaded!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		// Fetch AllBooks
		fetchAllBooks: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const booksRef = collection(db, 'books')
					const UserquerySnaphot = await getDocs(userBookRef)
					const BooksquerySnaphot = await getDocs(booksRef)
					let books: BookTypes[] = []
					UserquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach((doc) => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: 'Book not loaded!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		//Fetch single book
		fetchSingleBook: build.query({
			async queryFn(id) {
				try {
					const docRef = doc(db, 'books', id)
					const snapshot = await getDoc(docRef)
					const docUserRef = doc(db, 'userBook', id)
					const UserSnapshot = await getDoc(docUserRef)
					const CurrentSnaphot = snapshot.exists() ? snapshot : UserSnapshot
					return { data: { id: id, ...CurrentSnaphot.data() } as BookTypes }
				} catch (error: any) {
					Toast.show({
						text1: 'You book not loaded!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		// add Book Review
		addBookReview: build.mutation({
			async queryFn({ id, rating, profile }) {
				try {
					const docRef = doc(db, 'books', id)
					const docUserRef = doc(db, 'userBook', id)
					const bookGetRef = await getDoc(docRef)
					const UserRef = doc(db, 'users', profile.uid)
					const CurrentRef = bookGetRef.exists() ? docRef : docUserRef
					await updateDoc(CurrentRef, {
						comments: arrayUnion(rating)
					})
					await updateDoc(UserRef, {
						revieCount: firebase.firestore.FieldValue.increment(1)
					})
					Toast.show({
						text1: 'You add book review!',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: 'You  not added book review!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
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
				} catch (error: any) {
					Toast.show({
						text1: 'You book not added to favorites!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		
		// add userBook
		addUserBook: build.mutation({
			async queryFn({ UserId, book }) {
				try {
					const reference = doc(db, 'users', UserId)
					
					await addDoc(collection(db, 'userBook'), book)
					
					Toast.show({
						text1: 'You book add!',
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: 'You book not add!',
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		// delete favorite book
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
				} catch (error: any) {
					Toast.show({
						text1: 'You  book not remove from favorites!',
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
	useDeleteBookFromFavoriteMutation,
	useFetchHorrorBooksQuery,
	useFetchActionBooksQuery,
	useFetchCurrentUserBooksQuery,
	useAddBookReviewMutation,
	useFetchAllBooksQuery,
	useFetchSingleBookQuery,
	useAddUserBookMutation,
	useAddBookToFavoriteMutation,
	useFetchBooksQuery
} = bookApi