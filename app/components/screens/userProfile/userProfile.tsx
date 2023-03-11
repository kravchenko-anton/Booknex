import { Feather } from '@expo/vector-icons'
import RNBounceable from '@freakycoder/react-native-bounceable'
import I18n from 'i18n-js'
import { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchCurrentUserBooksQuery } from '../../../store/api/book/query'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import { useScaleOnMount } from '../../../utils/useBounces'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Header from '../../ui/header'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import ModalPopup from '../../ui/modal'
import Statistics from '../../ui/statistics'
import AddBookPopup from './AddBook/AddBookPopup'

const UserProfilePages = () => {
	const { goBack } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchSingleUserQuery(user?.uid)
	const [isVisible, setIsVisible] = useState(false)
	const { styleAnimation } = useScaleOnMount()
	const { navigate } = useTypedNavigation()
	const { data: CurrentUserBook } = useFetchCurrentUserBooksQuery(
		CurrentUser?.uid,
		{
			skip: !CurrentUser
		}
	)
	
	if (!CurrentUser || !user) return <Loader />
	return (
		<Layout className='h-full'>
			<AnimatedFlatList contentHeight={410} data={CurrentUserBook ? CurrentUserBook : []}>
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
				
				<Header className='mt-4'>
					<Feather
						onPress={() => navigate('Settings', { uid: user.uid })}
						name='settings'
						size={24}
						color='white'
					/>
				</Header>
				
				<View className=' items-center mt-2'>
					<Animated.View style={styleAnimation}>
						<RNBounceable>
							{CurrentUser.photoURL ? (
								<Image
									source={{ uri: CurrentUser.photoURL }}
									className='w-[130px] border-2 border-primary h-[130px] rounded-full'
								/>
							) : (
								<ClearUserLogo letter={CurrentUser.name} width={130} height={130} />
							)}
						</RNBounceable>
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
