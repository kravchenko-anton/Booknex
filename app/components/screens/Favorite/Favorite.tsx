import I18n from 'i18n-js'
import { ScrollView, Text, View } from 'react-native'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import Header from '../../ui/header'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import UserMapElement from '../../ui/UserMapElement'
import FavoriteFlatList from './ui/FavoriteFlatList'

const Favorite = () => {
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchSingleUserQuery(user?.uid)
	if (!CurrentUser || !user) return <Loader />
	return (
		<Layout className=' h-full'>
			<Header className='mb-4 mt-4'>
				<Text className='text-2xl font-bold text-white'>
					{I18n.t('Favorite')} 📚
				</Text>
			</Header>
			<ScrollView showsVerticalScrollIndicator={false}>
				{CurrentUser.favoritesUser.length ? (
					<View>
						<Text className='text-white text-2xl mb-2 mt-2 font-bold'>
							{' '}
							{I18n.t('FavoritesUsers')} 👥
						</Text>
						<ScrollView
							horizontal={true}
							className='h-[130px] w-full mt-1'
							showsHorizontalScrollIndicator={false}
						>
							{CurrentUser.favoritesUser.map(userUid => (
								<UserMapElement key={userUid.uid} userUId={userUid.uid} />
							))}
						</ScrollView>
					</View>
				) : null}

				{CurrentUser.startReadBook.length ? (
					<View>
						<Text className='text-white text-3xl mb-4 mt-2 font-bold'>
							{I18n.t('StartedBooks')} 🧨
						</Text>
						<FavoriteFlatList data={CurrentUser.startReadBook} />
					</View>
				) : (
					<Text className='text-white text-2xl mt-4 text-center font-bold'>
						{' '}
						{I18n.t('YouDontHaveAStartedBook')}
					</Text>
				)}
				{CurrentUser.favoritesBook.length ? (
					<View>
						<Text className='text-white text-3xl mb-4 mt-4 font-bold'>
							{' '}
							{I18n.t('FavoriteBooks')} 💖
						</Text>
						<FavoriteFlatList data={CurrentUser.favoritesBook} />
					</View>
				) : (
					<Text className='text-white text-2xl mt-4 text-center font-bold'>
						{' '}
						{I18n.t('YouDontHaveAfavoriteBook')}
					</Text>
				)}

				{CurrentUser.finishedBook.length ? (
					<View>
						<Text className='text-white text-3xl mb-4 mt-4 font-bold'>
							{I18n.t('FinishedBooks')} ✅
						</Text>
						<FavoriteFlatList data={CurrentUser.finishedBook} />
					</View>
				) : (
					<Text className='text-white text-2xl mt-4 text-center font-bold'>
						{' '}
						{I18n.t('YouDontHaveAFinishedBook')}
					</Text>
				)}
			</ScrollView>
		</Layout>
	)
}

export default Favorite
