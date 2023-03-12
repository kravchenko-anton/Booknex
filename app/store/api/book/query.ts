import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
import { randChoice } from '../../../utils/randomElelementFromArray'
import { api } from '../api'
import { BookTypes, iBookwithRating } from '../api.types'

const bookQuery = api.injectEndpoints({
	endpoints: build => ({
		
		// Fetch CurrentUserBooks
		fetchCurrentUserBooks: build.query({
			async queryFn(AutorUid) {
				try {
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('CurrentUserBooks' + AutorUid)
					
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('CurrentUserBooks from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes[] }
					} else {
						console.log('CurrentUserBooks from firebase')
						const q = query(
							collection(db, 'userBook'),
							where('AutorUid', '==', AutorUid)
						)
						const querySnaphot = await getDocs(q)
						let books: BookTypes[] = []
						querySnaphot?.forEach(doc => {
							books.push({ id: doc.id, ...doc.data() } as BookTypes)
						})
						await AsyncStorage.setItem('CurrentUserBooks' + AutorUid, JSON.stringify({ data: books })).then(() => console.log('CurrentUserBooks stored' + AutorUid))
						return { data: books }
					}
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
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('PopularBooks')
					
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('PopularBooks from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes[] }
					} else {
						console.log('PopularBooks from firebase')
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
						await AsyncStorage.setItem('PopularBooks', JSON.stringify({ data: books.sort((a, b) => b.rating - a.rating) })).then(() => console.log(' PopularBooks stored'))
						return { data: books.sort((a, b) => b.rating - a.rating) }
					}
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
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('AllBooks')
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('AllBooks from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes[] }
					} else {
						console.log('AllBooks from firebase')
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
						await AsyncStorage.setItem('AllBooks', JSON.stringify({ data: books })).then(() => console.log(' AllBooks stored'))
						return { data: books }
					}
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
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('randomBook')
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('randomBook from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes[] }
					} else {
						console.log('randomBook from firebase')
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
						await AsyncStorage.setItem('randomBook', JSON.stringify({ data: randChoice<BookTypes>(books) ? randChoice<BookTypes>(books) : [books[0]] })).then(() => console.log(' randomBook stored'))
						return { data: randChoice<BookTypes>(books) ? randChoice<BookTypes>(books) : [books[0]] }
					}
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
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('AllBooksNoLang')
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('AllBooksNoLang from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes[] }
					} else {
						console.log('AllBooksNoLang from firebase')
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
						await AsyncStorage.setItem('AllBooksNoLang', JSON.stringify({ data: books })).then(() => console.log(' AllBooksNoLang saved'))
						return { data: books }
					}
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
					const isConnetcted = await NetInfo.fetch()
					console.log(isConnetcted.isConnected)
					const storedBooks = await AsyncStorage.getItem('singleBook' + id)
					if (storedBooks && !isConnetcted.isConnected) {
						console.log('singleBook from storage')
						console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as BookTypes }
					} else {
						console.log('singleBook from firebase')
						const docRef = doc(db, 'books', id)
						const snapshot = await getDoc(docRef)
						const docUserRef = doc(db, 'userBook', id)
						const UserSnapshot = await getDoc(docUserRef)
						const CurrentSnaphot = snapshot.exists() ? snapshot : UserSnapshot
						
						
						await AsyncStorage.setItem('singleBook' + id, JSON.stringify({ data: { id: id, ...CurrentSnaphot.data() } })).then(() => console.log('singleBook ' + id + ' saved'))
						return { data: { id: id, ...CurrentSnaphot.data() } as BookTypes }
					}
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
	useFetchAllBooksNoLangQuery,
	useFetchMostPopularBooksQuery,
	useFetchAllBooksQuery,
	useFetchSingleBookQuery,
	useFetchRandomBooksQuery
} = bookQuery
