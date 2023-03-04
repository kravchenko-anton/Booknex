import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
import { randChoice } from '../../../utils/randomElelementFromArray'
import { api } from '../api'
import { BookTypes, iBookwithRating } from '../api.types'

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
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
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
			async queryFn(AutorUid) {
				try {
					const q = query(
						collection(db, 'userBook'),
						where('AutorUid', '==', AutorUid)
					)
					const querySnaphot = await getDocs(q)
					let books: BookTypes[] = []
					querySnaphot?.forEach(doc => {
						books.push({ id: doc.id, ...doc.data() } as BookTypes)
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
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
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					BooksquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		//Fetch Most popular book
		fetchMostPopularBooks: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const booksRef = collection(db, 'books')
					const UserquerySnaphot = await getDocs(userBookRef)
					const BooksquerySnaphot = await getDocs(booksRef)
					let books: iBookwithRating[] = []
					UserquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push(<iBookwithRating>{
								id: doc.id,
								...doc.data(),
								rating: doc.data().comments
									? Object.values(doc.data().comments).reduce(
										(t, values: any) => t + values.rating,
										0
									)
									: 0
							})
						}
					})
					BooksquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push(<iBookwithRating>{
								id: doc.id,
								...doc.data(),
								rating: doc.data().comments
									? Object.values(doc.data().comments).reduce(
										(t, values: any) => t + values.rating,
										0
									)
									: 0
							})
						}
					})
					
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
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
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					BooksquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		// Fetch random book
		fetchRandomBooks: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const booksRef = collection(db, 'books')
					const UserquerySnaphot = await getDocs(userBookRef)
					const BooksquerySnaphot = await getDocs(booksRef)
					let books: BookTypes[] = []
					UserquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					BooksquerySnaphot?.forEach(doc => {
						if (doc.data().bookLanguage.toLowerCase().includes(I18n.locale)) {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						}
					})
					return { data: randChoice<BookTypes>(books) }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		}),
		
		
		// Fetch AllBooks no by language
		fetchAllBooksNoLang: build.query({
			async queryFn() {
				try {
					const userBookRef = collection(db, 'userBook')
					const booksRef = collection(db, 'books')
					const UserquerySnaphot = await getDocs(userBookRef)
					const BooksquerySnaphot = await getDocs(booksRef)
					let books: BookTypes[] = []
					UserquerySnaphot?.forEach(doc => {
						books.push({ id: doc.id, ...doc.data() } as BookTypes)
					})
					BooksquerySnaphot?.forEach(doc => {
						books.push({ id: doc.id, ...doc.data() } as BookTypes)
					})
					
					return { data: books }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Book not loaded!'),
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
						text1: I18n.t('Book not loaded!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			providesTags: ['book']
		})
	})
})

export const {
	useFetchCurrentUserBooksQuery,
	useFetchBooksQuery,
	useFetchAllBooksNoLangQuery,
	useFetchMostPopularBooksQuery,
	useFetchActionBooksQuery,
	useFetchAllBooksQuery,
	useFetchSingleBookQuery,
	useFetchRandomBooksQuery
} = bookQuery
