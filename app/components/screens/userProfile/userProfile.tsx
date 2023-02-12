import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAction } from '../../../hook/useAction'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchCurrentUserBooksQuery } from '../../../store/api/book/query'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import { useScaleOnMount } from '../../../utils/useBounces'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import Statistics from '../../ui/statistics'
import AddBookPopup from './AddBookPopup'

const UserProfilePages = () => {
	const { goBack } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchSingleUserQuery(user?.uid)
	const [isVisible, setIsVisible] = useState(false)
	const { styleAnimation } = useScaleOnMount()
	const { logout } = useAction()
	const { data: CurrentUserBook } = useFetchCurrentUserBooksQuery(
		CurrentUser?.name,
		{
			skip: !CurrentUser
		}
	)
	if (!CurrentUser || !user) return <Loader />
	return (
		<Layout className='h-full'>
			<AnimatedFlatList data={CurrentUserBook ? CurrentUserBook : []}>
				<ModalPopup
					height={600}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					title={'Add book'}
				>
					<AddBookPopup
						user={user}
						CurrentUser={CurrentUser}
						setIsVisible={setIsVisible}
					/>
				</ModalPopup>

				<View className='flex-row justify-between mt-4 '>
					<Feather
						onPress={() => goBack()}
						name='arrow-left'
						size={24}
						color='white'
					/>
					<MaterialIcons
						onPress={() => logout(null)}
						name='logout'
						size={24}
						color='white'
					/>
				</View>

				<View className=' items-center mt-2'>
					<Animated.View style={styleAnimation}>
						{CurrentUser.photoURL ? (
							<Image
								source={{ uri: CurrentUser.photoURL }}
								className='w-[100px] border-2 border-primary h-[100px] rounded-full'
							/>
						) : (
							<ClearUserLogo letter={user.email} width={130} height={130} />
						)}
					</Animated.View>

					<Text className='text-white font-bold text-2xl mt-2'>
						{CurrentUser.name}
					</Text>
					<Text className='text-gray text-md'>{CurrentUser.email}</Text>
				</View>
				<Statistics
					FirstDescription={'Favorite'}
					FirstHeading={
						CurrentUser.favoritesBook.length.toString()
							? CurrentUser.favoritesBook.length.toString()
							: '0'
					}
					SecondHeading={CurrentUser.revieCount.toString()}
					SecondDescription={'Review'}
					ThirdHeading={CurrentUserBook?.length}
					ThirdDescription={'Books'}
				/>

				<View className='flex-row justify-between items-center mt-6'>
					<Text className='text-white  font-bold  text-2xl'>Books</Text>
					<Text
						className='text-gray  text-lg'
						onPress={() => setIsVisible(!isVisible)}
					>
						Add books
					</Text>
				</View>
			</AnimatedFlatList>
		</Layout>
	)
}

export default UserProfilePages
