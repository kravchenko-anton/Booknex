import firebase from 'firebase/compat'
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc
} from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
import { api } from '../api'
import FieldValue = firebase.firestore.FieldValue
import Timestamp = firebase.firestore.Timestamp

const bookMutation = api.injectEndpoints({
	endpoints: build => ({
		
		// Fetch appBooks book
		RemoveUserBook: build.mutation({
			async queryFn({ id }) {
				try {
					const userBookRef = doc(db, 'userBook', id)
					deleteDoc(userBookRef).then(() => {
						Toast.show({
							text1: I18n.t('You delete book!'),
							type: 'success'
						})
					})
					return { data: 'Ok' }
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

		//Add Chat to book
		AddBookToChat: build.mutation({
			async queryFn({ id }) {
				try {
					const BookRef = doc(db, 'BookChats', id)
					const docSnap = await getDoc(BookRef)
					if (!docSnap.exists()) {
						await setDoc(BookRef, { message: [] })
					}
					return { data: 'Ok' }
				} catch (error: any) {

					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'chat' }]
		}),

		//AddMessage
		AddMessageToChat: build.mutation({
			async queryFn({ id, message, uid }) {
				try {
					const BookRef = doc(db, 'BookChats', id)
					await updateDoc(BookRef, {
						comments: arrayUnion({
							uid,
							message,
							timeStamp: new Date().toISOString()
						})
					})

					return { data: 'Ok' }
				} catch (error: any) {
										Toast.show({
						text1: I18n.t('Error in message!'),
						text2: error.message,
						type: 'error'
										})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'chat' }]
		}),

		//Remove message
		RemoveMessageFromChat: build.mutation({
			async queryFn({ id, message, uid, timeStamp }) {
				try {
					const BookRef = doc(db, 'BookChats', id)
					await updateDoc(BookRef, {
						comments: arrayRemove({
							uid,
							message,
							timeStamp
						})
					})

					return { data: 'Ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Error in message!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'chat' }]
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
						text1: I18n.t('You add book review!'),
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
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
						favoritesBook: arrayUnion(book.id)
					})
					Toast.show({
						text1: I18n.t('You add book to favorite!'),
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),

		// add Book to start Reading
		addBookToStartReading: build.mutation({
			async queryFn({ currentUserUID, book }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						startReadBook: arrayUnion(book.id)
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),

		// Finish Book
		addBookToEndedBook: build.mutation({
			async queryFn({ currentUserUID, book }) {
				try {
					const reference = doc(db, 'users', currentUserUID)
					await updateDoc(reference, {
						startReadBook: arrayRemove(book.id),
						finishedBook: arrayUnion(book.id)
					})
					Toast.show({
						text1: I18n.t('You finish book!'),
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
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
			async queryFn({  book }) {
				try {
					await addDoc(collection(db, 'userBook'), book)
					Toast.show({
						text1: I18n.t('You add book!'),
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					console.log(error)
					Toast.show({
						text1: I18n.t('Something went wrong!'),
						text2: error.message,
						type: 'error'
					})
					return { error }
				}
			},
			invalidatesTags: () => [{ type: 'book' }, { type: 'user' }]
		}),
		
		
		
		// Get search results from google book api
		SearchBookByGoogleApi: build.mutation({
			async queryFn({ searchTerm, author, lang }) {
				try {
					const response = await fetch(
						`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}${author !== '' ? `+inauthor:${author}`: ''}&key=AIzaSyDQMGETJt4y9-beaw4EMRBQp53jimFNuFw&langRestrict=${lang}&hl=${lang}?fields=id`
					)
					const books = await response.json()
					
					const HightQuaittyImage = await fetch(
						`https://www.googleapis.com/books/v1/volumes/${books.items[0].id}?fields=id,volumeInfo(imageLinks)&key=AIzaSyDQMGETJt4y9-beaw4EMRBQp53jimFNuFw`
					)
					const HightQuaittyImageJson = await HightQuaittyImage.json()
const finalBook = { ...books.items[0].volumeInfo, ...{ HighQualityImage: HightQuaittyImageJson.volumeInfo.imageLinks.extraLarge } }
					return { data: finalBook  }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
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
						favoritesBook: arrayRemove(book.id)
					})
					Toast.show({
						text1: I18n.t('You delete book from favorite!'),
						type: 'success'
					})
					return { data: 'ok' }
				} catch (error: any) {
					Toast.show({
						text1: I18n.t('Something went wrong!'),
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
	useRemoveMessageFromChatMutation,
	useRemoveUserBookMutation,
	useAddMessageToChatMutation,
	useAddBookReviewMutation,
	useAddBookToStartReadingMutation,
	useAddBookToEndedBookMutation,
	useSearchBookByGoogleApiMutation,
	useAddUserBookMutation,
	useAddBookToChatMutation,
	useAddBookToFavoriteMutation
} = bookMutation
