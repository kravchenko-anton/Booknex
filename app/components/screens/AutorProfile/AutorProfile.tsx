import { Feather } from '@expo/vector-icons'
import { Image, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useAddUserToFavoriteMutation, useFetchMyProfileQuery, useFetchSingleUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import Statistics from '../../ui/statistics'

const SingleUserPage = ({ route }: any) => {
	const { uid } = route.params
	const { goBack } = useTypedNavigation()
	const [addToFavorite] = useAddUserToFavoriteMutation()
	const { user: StateUser } = useTypedSelector(state => state.auth)
	const { data: user } = useFetchSingleUserQuery(uid)
	const { data: Profile } = useFetchMyProfileQuery(StateUser?.uid)
	const isFavorite = Profile?.favoritesUser.some(item => item.uid === user?.uid) || uid !== StateUser?.uid
	if (!user) return <Loader />
	return <Layout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className='flex-row justify-between mt-4 '>
				<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
				{!isFavorite ?
					<Feather onPress={() => addToFavorite({ currentUserUID: StateUser?.uid, favoriteUser: user })} name='heart'
					         size={24} color='white' /> : null}
			
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
			<Statistics FirstDescription={'Read'} FirstHeading={user.booksCount.toString()}
			            SecondHeading={user.revieCount.toString()}
			            SecondDescription={'Review'} ThirdHeading={Object.values(user.userBooks).length.toString()}
			            ThirdDescription={'Books'} />
			
			
			<Text className='text-white  font-bold  text-2xl mt-6'>Books</Text>
			
			<View className='mb-2 flex-1'>
				{user.userBooks.length ? user.userBooks.map(books => (
					<View>
						<BookItems id={books.id} genre={['SADDSA', 'adsdsasad']}
						           image={'https://www.onthisday.com/images/people/sylvester-stallone-medium.jpg'} name={'ADSAS'}
						           autor={'DSA'} rating={4} />
					</View>
				)) : <Text className='text-gray text-xl'>None Books!</Text>}
			</View>
		
		</ScrollView>
	</Layout>
}

export default SingleUserPage