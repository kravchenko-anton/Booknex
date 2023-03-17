import RNBounceable from '@freakycoder/react-native-bounceable'
import I18n from 'i18n-js'
import { Image, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useFetchCurrentUserBooksQuery } from '../../../store/api/book/query'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import ClearUserLogo from '../../ui/clearUserLogo'
import Header from '../../ui/header'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import Statistics from '../../ui/statistics'
import AuthorFavoritesButton from './ui/AuthorFavoritesButton'

const SingleUserPage = ({ route }: any) => {
	const { uid } = route.params
	const { navigate } = useTypedNavigation()
	const { data: user } = useFetchSingleUserQuery({ uid, navigate })
	const { data: CurrentUserBook } = useFetchCurrentUserBooksQuery({
		AutorUid: user?.uid, navigate
	})
	
	if (!user) return <Loader />
	return (
		<Layout className='h-full'>
			<AnimatedFlatList contentHeight={500} data={CurrentUserBook ? CurrentUserBook : []}>
				<Header className='mt-4'>
					<AuthorFavoritesButton user={user} />
				</Header>
				<View className='items-center mt-8'>
					<RNBounceable>
						{user.photoURL ? (
							<Image
								source={{ uri: user.photoURL }}
								className='w-[200px] border-2 border-primary h-[200px] rounded-full'
							/>
						) : (
							<ClearUserLogo letter={user.name} width={150} height={150} />
						)}
					</RNBounceable>
					<Text className='text-white font-bold text-2xl mt-2'>{user.name}</Text>
					<Text className='text-gray text-md'>{user.email}</Text>
				</View>
				<Statistics
					FirstDescription={I18n.t('Favorites')}
					FirstHeading={
						user.favoritesBook.length.toString()
							? user.favoritesBook.length.toString()
							: '0'
					}
					SecondHeading={user.revieCount.toString()}
					SecondDescription={I18n.t('UserReviews')}
					ThirdHeading={CurrentUserBook?.length}
					ThirdDescription={I18n.t('UserBooks')}
				/>
				<Text className='text-white  font-bold  text-2xl mt-6'>
					{I18n.t('Books')}
				</Text>
			</AnimatedFlatList>
		</Layout>
	)
}

export default SingleUserPage
