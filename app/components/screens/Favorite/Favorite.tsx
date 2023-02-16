import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { BookTypes } from '../../../store/api/api.types'
import { useFetchSingleBookQuery } from '../../../store/api/book/query'
import { useFetchSingleUserQuery } from '../../../store/api/user/query'
import AnimatedFlatList from '../../ui/BookItems/AnimatedFlatList'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import UserMapElement from '../../ui/UserMapElement'
import FavoriteFlatList from './FavoriteFlatList'

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
<FavoriteFlatList data={CurrentUser.favoritesBook}>
	{CurrentUser.favoritesUser.length ?  <ScrollView
		horizontal={true}
		className='h-[140px] w-full mt-1'
		showsHorizontalScrollIndicator={false}
	>
		{CurrentUser.favoritesUser.map(userUid => (
			<UserMapElement key={userUid.uid} userUId={userUid.uid} />
		))}
	</ScrollView> : null}
</FavoriteFlatList>
		</Layout>
	)
}

export default Favorite
