import { Image, Pressable, ScrollView, Text } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import BookItems from '../../ui/BookItems/BookItems'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'

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
					<Pressable onPress={() => navigate('AutorProfile', { uid: item.uid })} key={item.uid}
					           className='items-center justify-center  mr-4'>
						{item.photoURL ? <Image source={{ uri: item.photoURL }} className='w-[100px] h-[100px] rounded-full' />
							:
							<ClearUserLogo height={100} width={100} letter={item.email} />
						}
						<Text
							className='text-gray text-md font-bold mt-2'>{item.name}</Text>
					</Pressable>
				)) : null}
		</ScrollView>
		<Text className='mt-4 text-whiteGray font-bold text-xl'>You favorite books</Text>
		{CurrentUser.favoritesBook.length ? CurrentUser.favoritesBook.map((item) => (
			<BookItems id={item.id} key={item.id} genre={item.genre}
			           rating={item.comments.reduce((t, { rating }) => t + rating, 0)}
			           image={item.Image}
			           name={item.Name} autor={item.autor.toString()} />
		)) : null}
	</Layout>
}

export default Favorite