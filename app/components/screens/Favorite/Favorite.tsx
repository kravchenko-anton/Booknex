import { Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'

const Favorite = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser, isLoading, error } = useFetchSingleUserQuery(user?.uid)
	if (!CurrentUser || !user) return <Loader />
	return <Layout>
		<View className='h-full'>
			<Text className='text-white text-2xl mb-2 font-bold'>You favorite book!</Text>
			<AnimatedFlatList data={CurrentUser.favoritesBook} />
		</View>
	</Layout>
}

export default Favorite
