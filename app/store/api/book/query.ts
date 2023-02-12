import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
import { api } from '../api'
import { BookTypes } from '../api.types'

const bookQuery = api.injectEndpoints({
	endpoints: build => ({
		
		// Fetch default book from admin
		fetchBooks: build.query({
			async queryFn() {
				try {
					const blogRef = collection(db, 'books')
					const querySnaphot = await getDocs(blogRef)
					let books: BookTypes[] = []
					querySnaphot?.forEach(doc => {
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
					const q = query(
						collection(db, 'userBook'),
						where('autor', 'array-contains', AutorName)
					)
					const querySnaphot = await getDocs(q)
					let books: BookTypes[] = []
					querySnaphot?.forEach(doc => {
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
					UserquerySnaphot?.forEach(doc => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach(doc => {
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
					UserquerySnaphot?.forEach(doc => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach(doc => {
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
					UserquerySnaphot?.forEach(doc => {
						// @ts-ignore
						books.push({ id: doc.id, ...doc.data() })
					})
					BooksquerySnaphot?.forEach(doc => {
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
		
		
	})
})


export const {
	useFetchCurrentUserBooksQuery,
	useFetchBooksQuery,
	useFetchActionBooksQuery,
	useFetchAllBooksQuery,
	useFetchSingleBookQuery,
} = bookQuery
