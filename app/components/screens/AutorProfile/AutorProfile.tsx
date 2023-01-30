import { AntDesign, Feather } from '@expo/vector-icons'
import { Image, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchCurrentUserBooksQuery } from '../../../store/api/books'
import {
	useAddUserToFavoriteMutation,
	useFetchMyProfileQuery,
	useFetchSingleUserQuery,
	useRemoveUserToFavoriteMutation
} from '../../../store/api/user'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import Statistics from '../../ui/statistics'

const SingleUserPage = ({ route }: any) => {
	const { uid } = route.params
	const { goBack } = useTypedNavigation()
	const [addToFavorite] = useAddUserToFavoriteMutation()
	const [removeFavorite] = useRemoveUserToFavoriteMutation()
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { data: user } = useFetchSingleUserQuery(uid)
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const isFavorite = Profile?.favoritesUser.some(item => item.uid === user?.uid)
	if (!user) return <Loader />
	const { data: CurrentUserBook } = useFetchCurrentUserBooksQuery(user.name)
	const userFavoriteData = {
		uid: user?.uid
	}
	return <Layout>
		<View className='h-full'>
			<View className='flex-row justify-between mt-4 '>
				<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
				{(uid !== StateUser?.uid) ? !isFavorite ?
					<Feather onPress={() => addToFavorite({ currentUserUID: StateUser?.uid, favoriteUser: userFavoriteData })}
					         name='heart'
					         size={24} color='white' /> :
					<AntDesign onPress={() => removeFavorite({ currentUserUID: StateUser?.uid, favoriteUser: userFavoriteData })}
					           name='delete'
					           size={24}
					           color='white' /> : null}
			
			</View>
			
			<View className=' items-center mt-8'>
				{user.photoURL ?
					<Image source={{ uri: user.photoURL }}
					       className='w-[200px] border-2 border-primary h-[200px] rounded-full' /> :
					<ClearUserLogo letter={user.email} width={150} height={150} />}
				
				<Text
					className='text-white font-bold text-2xl mt-2'>{user.name}</Text>
				<Text
					className='text-gray text-md'>{user.email}</Text>
			</View>
			<Statistics FirstDescription={'Favorite'}
			            FirstHeading={user.favoritesBook.length.toString() ? user.favoritesBook.length.toString() : '0'}
			            SecondHeading={user.revieCount.toString()}
			            SecondDescription={'Review'} ThirdHeading={CurrentUserBook?.length}
			            ThirdDescription={'Books'} />
			
			
			<Text className='text-white  font-bold  text-2xl mt-6'>Books</Text>
			
			
			<AnimatedFlatList data={CurrentUserBook ? CurrentUserBook : []} />
		
		
		</View>
	</Layout>
}

export default SingleUserPage
