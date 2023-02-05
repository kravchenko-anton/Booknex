

import { ScrollView, View } from 'react-native'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchSingleUserQuery } from '../../../store/api/user'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import UserMapElement from '../../ui/UserMapElement'

const Favorite = () => {
	
	const { user } = useTypedSelector(state => state.auth)
	const {
		data: CurrentUser,
		isLoading,
		error
	} = useFetchSingleUserQuery(user?.uid)
	if (!CurrentUser || !user) return <Loader />
	return (
		<Layout className='h-full'>
				<AnimatedFlatList data={CurrentUser.favoritesBook} >
				<ScrollView
					horizontal={true}
					className='h-[130px] w-full mt-1'
					showsHorizontalScrollIndicator={false}
				>
					{CurrentUser.favoritesUser.map(userUid => (
						<UserMapElement key={userUid.uid} userUId={userUid.uid} />
					))}
				</ScrollView>
				</AnimatedFlatList>
		</Layout>
	)
}

export default Favorite
