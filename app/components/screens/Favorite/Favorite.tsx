import { ScrollView, Text } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import UserFavorite from './userFavorite'

const Favorite = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser, isLoading, error } = useFetchSingleUserQuery(user?.uid)
	if (!CurrentUser || !user) return <Loader />
	return <Layout>
		<Text className='mt-4 text-white font-bold text-3xl mb-4'>You favorite</Text>
		<ScrollView showsHorizontalScrollIndicator={false} className='mt-4' horizontal={true}>
			{
				CurrentUser.favoritesUser.length ? CurrentUser.favoritesUser.map(item => (
					<UserFavorite key={item.uid} id={item.uid} />
				)) : null}
		</ScrollView>
		<Text className='mt-4 text-whiteGray font-bold text-xl'>You favorite books</Text>
		{CurrentUser.favoritesBook.length ? CurrentUser.favoritesBook.map((item) => (
			<BookItems id={item.id} key={item.id} genre={item.genre}
			           description={item.description}
			           image={item.Image}
			           name={item.Name} autor={item.autor.toString()} />
		)) : null}
	</Layout>
}

export default Favorite