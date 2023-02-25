import { Feather, MaterialIcons } from '@expo/vector-icons'
import I18n from 'i18n-js'
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
import DialogPopup from '../../ui/DialogPopup'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ClearUserLogo from '../../ui/clearUserLogo'
import ModalPopup from '../../ui/modal'
import Statistics from '../../ui/statistics'
import AddBookPopup from './AddBookPopup'

const UserProfilePages = () => {
	const { goBack } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchSingleUserQuery(user?.uid)
	const [isVisible, setIsVisible] = useState(false)
	const { styleAnimation } = useScaleOnMount()
const {navigate} = useTypedNavigation()
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
					height={400}
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
					<Feather
						onPress={() => navigate('Settings', {uid: user.uid})}
						name='settings'
						size={24}
						color='white'
					/>
				</View>

				<View className=' items-center mt-2'>
					<Animated.View style={styleAnimation}>
						{CurrentUser.photoURL ? (
							<Image
								source={{ uri: CurrentUser.photoURL }}
								className='w-[130px] border-2 border-primary h-[130px] rounded-full'
							/>
						) : (
							<ClearUserLogo letter={CurrentUser.name} width={130} height={130} />
						)}
					</Animated.View>

					<Text className='text-white font-bold text-2xl mt-2'>
						{CurrentUser.name}
					</Text>
					<Text className='text-gray text-md'>{CurrentUser.email}</Text>
				</View>
				<Statistics
					FirstDescription={I18n.t('Favorites')}
					FirstHeading={
						CurrentUser.favoritesBook.length.toString()
							? CurrentUser.favoritesBook.length.toString()
							: '0'
					}
					SecondHeading={CurrentUser.revieCount.toString()}
					SecondDescription={I18n.t('UserReviews')}
					ThirdHeading={CurrentUserBook?.length}
					ThirdDescription={I18n.t('UserBooks')}
				/>

				<View className='flex-row justify-between items-center mt-6'>
					<Text className='text-white  font-bold  text-2xl'>{I18n.t('Books')}</Text>
					<Text
						className='text-gray  text-lg'
						onPress={() => setIsVisible(!isVisible)}
					>
						{I18n.t('addBook')}
					</Text>
				</View>
			</AnimatedFlatList>
		</Layout>
	)
}

export default UserProfilePages
