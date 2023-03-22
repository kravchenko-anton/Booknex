import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import I18n from 'i18n-js'
import { db } from '../../../utils/firebase'
import { api } from '../api'
import { Iuser } from '../api.types'

const userQueryApi = api.injectEndpoints({
	endpoints: build => ({
		//Fetch all users
		fetchUser: build.query({
			async queryFn(navigate) {
				try {
					const isConnetcted = await NetInfo.fetch()
					const storedBooks = await AsyncStorage.getItem('allUsers')
					if (!storedBooks && !isConnetcted.isConnected) {
						await navigate('NoInternet')
						throw new Error(I18n.t('dontHaveInternetAndSavedData'))
					}
					if (storedBooks && !isConnetcted.isConnected) {
						// console.log('allUsers from storage')
						// console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as Iuser[] }
					} else {
						// console.log('allUsers from firebase')
						const blogRef = collection(db, 'users')
						const querySnaphot = await getDocs(blogRef)
						let user: Iuser[] = []
						querySnaphot?.forEach(doc => {
							user.push({ uid: doc.id, ...doc.data() } as Iuser)
						})
						await AsyncStorage.setItem('allUsers', JSON.stringify({ data: user }))
						return { data: user }
					}
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		}),
		
		// Fetch single user
		fetchSingleUser: build.query({
			async queryFn({ uid, navigate }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					
					const storedBooks = await AsyncStorage.getItem('singleUsers' + uid)
					if (!storedBooks && !isConnetcted.isConnected) {
						await navigate('NoInternet')
						throw new Error(I18n.t('dontHaveInternetAndSavedData'))
					}
					if (storedBooks && !isConnetcted.isConnected) {
						// console.log('singleUsers from storage')
						// console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as Iuser }
					} else {
						// console.log('singleUsers from firebase')
						const docRef = doc(db, 'users', uid)
						const snapshot = await getDoc(docRef)
						await AsyncStorage.setItem('singleUsers' + uid, JSON.stringify({ data: { uid, ...snapshot.data() } }))
						return { data: { uid, ...snapshot.data() } as Iuser }
					}
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		}),
		
		fetchMyProfile: build.query({
			async queryFn({ uid, navigate }) {
				try {
					const isConnetcted = await NetInfo.fetch()
					const storedBooks = await AsyncStorage.getItem('MyProfile' + uid)
					if (!storedBooks && !isConnetcted.isConnected) {
						await navigate('NoInternet')
						throw new Error(I18n.t('dontHaveInternetAndSavedData'))
					}
					if (storedBooks && !isConnetcted.isConnected) {
						// console.log('MyProfile from storage')
						// console.log(await JSON.parse(storedBooks))
						return { data: await JSON.parse(storedBooks).data as Iuser }
					} else {
						// console.log('MyProfile from firebase')
						const docRef = doc(db, 'users', uid)
						const snapshot = await getDoc(docRef)
						const Userdata = { uid, ...snapshot.data() } as Iuser
						// console.log(Userdata)
						// console.log({ ...snapshot.data() })
						
						await AsyncStorage.setItem('MyProfile' + uid, JSON.stringify({ data: Userdata }))
						return { data: Userdata }
					}
				} catch (error) {
					return { error }
				}
			},
			providesTags: ['user']
		})
	})
})
export const {
	useFetchSingleUserQuery,
	useFetchMyProfileQuery,
	useFetchUserQuery
} = userQueryApi
