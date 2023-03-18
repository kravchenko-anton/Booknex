import { GOOGLE_API_KEY } from '@env'
import NetInfo from '@react-native-community/netinfo'
import firebase from 'firebase/compat'
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import I18n from 'i18n-js'
import Toast from 'react-native-toast-message'
import { db } from '../../../utils/firebase'
import { api } from '../api'

const bookMutation = api.injectEndpoints({
	endpoints: build => ({
		
		//Add Chat to book
		AddBookToChat: build.mutation({
			async queryFn({ id }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' AddBookToChat Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log(' AddBookToChat Work')
						const BookRef = doc(db, 'BookChats', id)
						const docSnap = await getDoc(BookRef)
						if (!docSnap.exists()) {
							await setDoc(BookRef, { message: [] })
						}
						return { data: 'Ok' }
					}
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
					
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' AddMessageToChat Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('AddMessageToChat Work')
						const BookRef = doc(db, 'BookChats', id)
						await updateDoc(BookRef, {
							comments: arrayUnion({
								uid,
								message,
								timeStamp: new Date().toISOString()
							})
						})
						
						return { data: 'Ok' }
					}
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' RemoveMessageFromChat Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('RemoveMessageFromChat Work')
						const BookRef = doc(db, 'BookChats', id)
						await updateDoc(BookRef, {
							comments: arrayRemove({
								uid,
								message,
								timeStamp
							})
						})
						
						return { data: 'Ok' }
					}
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addBookReview Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addBookReview Work')
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
					}
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addBookToFavorite Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addBookToFavorite Work')
						const reference = doc(db, 'users', currentUserUID)
						await updateDoc(reference, {
							favoritesBook: arrayUnion(book.id)
						})
						Toast.show({
							text1: I18n.t('You add book to favorites!'),
							type: 'success'
						})
						return { data: 'ok' }
					}
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addBookToStartReading Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addBookToStartReading Work')
						
						const reference = doc(db, 'users', currentUserUID)
						await updateDoc(reference, {
							startReadBook: arrayUnion(book.id)
						})
						return { data: 'ok' }
					}
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addBookToEndedBook Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addBookToEndedBook Work')
						
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
					}
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
			async queryFn({ book }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' addUserBook Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('addUserBook Work')
						
						await addDoc(collection(db, 'userBook'), book)
						Toast.show({
							text1: I18n.t('You add book!'),
							type: 'success'
						})
						return { data: 'ok' }
					}
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
		// The results may not add up due to possible shortcomings of the google book api, this is the best solution available at the moment
		SearchBookByGoogleApi: build.mutation({
			async queryFn({ searchTerm, author, lang }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' SearchBookByGoogleApi Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('SearchBookByGoogleApi Work')
						
						
						const ModifiedData = {
							Mterm: searchTerm.trim()
								.replace(/[\s_-]+/g, '+')
								.replace(/\[.*?\]/g, '')
								.replace(/\(.*?\)/g, '')
								.replace(/\/\/\.epub/g, '')
								.replace(/\\.epub/g, ''),
							Mauthor: author.trim()
								.replace(/[\s_-]+/g, '+')
								.replace(/\[.*?\]/g, '')
								.replace(/\(.*?\)/g, '')
								.replace(/\/\/\.epub/g, '')
								.replace(/\\.epub/g, '')
						}
						try {
							const response = await fetch(
								`https://www.googleapis.com/books/v1/volumes?q=intitle:${ModifiedData.Mterm}${ModifiedData.Mauthor ? `+inauthor:${ModifiedData.Mauthor}` : ''}&key=${GOOGLE_API_KEY}&langRestrict=${lang}&hl=${lang}&printType=all&fields=items(id, volumeInfo(imageLinks, title, publishedDate, description, authors, categories, language, pageCount, categories))&orderBy=relevance&maxResults=40`)
							
							
							const books = await response.json()
							
							const CurrentNeedBook = books.items.find((item: any) => item.volumeInfo.imageLinks !== undefined)
							const HightQuaittyImage = await fetch(`https://www.googleapis.com/books/v1/volumes/${CurrentNeedBook.id}?fields=id,volumeInfo(imageLinks)&key=${GOOGLE_API_KEY}`
							)
							const HightQuaittyImageJson = await HightQuaittyImage.json()
							const imageSize = HightQuaittyImageJson.volumeInfo.imageLinks.extraLarge
								? HightQuaittyImageJson.volumeInfo.imageLinks.extraLarge
								: CurrentNeedBook.volumeInfo.imageLinks.thumbnail
							const finalBook = {
								...CurrentNeedBook.volumeInfo,
								...{ HighQualityImage: imageSize }
							}
							return { data: finalBook }
						} catch (error) {
							console.log(ModifiedData)
							console.log('Тестовое чтобы чекнуть ошибку')
							const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${ModifiedData.Mterm}${ModifiedData.Mauthor ? `+${ModifiedData.Mauthor}` : ''}&key=${GOOGLE_API_KEY}&langRestrict=${lang}&hl=${lang}&printType=all&fields=items(id, volumeInfo(imageLinks, title, publishedDate, description, authors, categories, language, pageCount, categories))&orderBy=relevance&maxResults=40`)
							
							const books = await response.json()
							const CurrentNeedBook = books.items.find((item: any) => item.volumeInfo.imageLinks !== undefined)
							console.log(CurrentNeedBook, 'CurrentNeedBook')
							const HightQuaittyImage = await fetch(`https://www.googleapis.com/books/v1/volumes/${CurrentNeedBook.id}?fields=id,volumeInfo(imageLinks)&key=${GOOGLE_API_KEY}`)
							const HightQuaittyImageJson = await HightQuaittyImage.json()
							const imageSize = HightQuaittyImageJson.volumeInfo.imageLinks.extraLarge
								? HightQuaittyImageJson.volumeInfo.imageLinks.extraLarge
								: CurrentNeedBook.volumeInfo.imageLinks.thumbnail
							
							const finalBook = {
								...CurrentNeedBook.volumeInfo,
								...{ HighQualityImage: imageSize }
							}
							return { data: finalBook }
						}
					}
				} catch (error: any) {
					console.log(error.message)
					Toast.show({
						text1: I18n.t('Something went wrong!'),
						text2: I18n.t('MaybeProblemWithGoogleApi'),
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
					const isConnetcted = await NetInfo.fetch()
					if (!isConnetcted.isInternetReachable && !isConnetcted.isConnected) {
						console.log(' deleteBookFromFavorite Error With enter	to internet')
						Toast.show({
							text1: I18n.t('No internet connection for new content!'),
							type: 'error'
						})
						return { data: 'No Internet' }
					} else {
						console.log('deleteBookFromFavorite Work')
						
						const reference = doc(db, 'users', currentUserUID)
						await updateDoc(reference, {
							favoritesBook: arrayRemove(book.id)
						})
						Toast.show({
							text1: I18n.t('You book remove from favorites!'),
							type: 'success'
						})
						return { data: 'ok' }
					}
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
	useAddMessageToChatMutation,
	useAddBookReviewMutation,
	useAddBookToStartReadingMutation,
	useAddBookToEndedBookMutation,
	useSearchBookByGoogleApiMutation,
	useAddUserBookMutation,
	useAddBookToChatMutation,
	useAddBookToFavoriteMutation
} = bookMutation
