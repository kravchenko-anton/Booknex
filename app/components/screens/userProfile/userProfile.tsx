import { Feather } from '@expo/vector-icons'
import { Image, ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Statistics from '../../ui/statistics'

const UserProfilePages = () => {
	const { goBack } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	if (!user) return null
	const { data: CurrentUser, isLoading, error } = useFetchSingleUserQuery(user.uid)
	if (!CurrentUser) return null
	return <Layout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className='flex-row justify-between mt-4 '>
				<Feather onPress={() => goBack()} name='arrow-left' size={24} color='white' />
				<Feather name='settings' size={24} color='white' />
			</View>
			
			<View className=' items-center mt-8'>
				{CurrentUser.photoURL ?
					<Image source={{ uri: CurrentUser.photoURL }}
					       className='w-[200px] border-2 border-primary h-[200px] rounded-full' /> :
					<ClearUserLogo letter={user.email} width={150} height={150} />}
				
				<Text
					className='text-white font-bold text-2xl mt-2'>{CurrentUser.name ? CurrentUser.name : CurrentUser.email.split('@')[0]}</Text>
				<Text
					className='text-gray text-md'>{CurrentUser.email}</Text>
			</View>
			<Statistics FirstDescription={'Read'} FirstHeading={CurrentUser.booksCount.toString()}
			            SecondHeading={CurrentUser.revieCount.toString()}
			            SecondDescription={'Review'} ThirdHeading={Object.values(CurrentUser.userBooks).length.toString()}
			            ThirdDescription={'Books'} />
			
			<View className='flex-row justify-between items-center mt-6'>
				<Text className='text-white  font-bold  text-2xl'>Books</Text>
				<Text className='text-gray  text-lg'>Add books</Text>
			</View>
			
			<View className='mb-2 flex-1'>
				{CurrentUser.userBooks.length ? CurrentUser.userBooks.map(books => (
					<View>
						<BookItems genre={['DSAADS']}
						           image={'https://www.onthisday.com/images/people/sylvester-stallone-medium.jpg'} name={'ADSAS'}
						           autor={'DSA'} rating={4} />
					</View>
				)) : <Text className='text-gray mt-4 text-xl'>None Books!</Text>}
			</View>
		
		</ScrollView>
	</Layout>
}

export default UserProfilePages