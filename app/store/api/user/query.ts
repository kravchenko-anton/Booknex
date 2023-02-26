import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { api } from '../api'
import { Iuser } from '../api.types'

const userQueryApi = api.injectEndpoints({
	endpoints: build => ({
		//Fetch all users
		fetchUser: build.query({
			async queryFn() {
				try {
					const blogRef = collection(db, 'users')
					const querySnaphot = await getDocs(blogRef)
					let user: Iuser[] = []
					querySnaphot?.forEach(doc => {
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

		// Fetch single user
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
		})
	})
})
export const {
	useFetchSingleUserQuery,
	useFetchMyProfileQuery,
	useFetchUserQuery
} = userQueryApi
