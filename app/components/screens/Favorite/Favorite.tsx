import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
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
const {goBack} = useTypedNavigation()
	if (!CurrentUser || !user) return <Loader />
	 return (
		<Layout className=' h-full'>
			<View className='flex flex-row items-center mb-5 mt-4 justify-between'>
				<Feather name='arrow-left' size={24} color='white' onPress={goBack}/>
				<Text className='text-2xl font-bold text-white'>Favorites 📚</Text>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
			{CurrentUser.favoritesUser.length ?
				<View>
			<Text className='text-white text-2xl mb-2 mt-4 font-bold'> Favorite users 👥</Text>
				<ScrollView
				horizontal={true}
				className='h-[140px] w-full mt-1'
				showsHorizontalScrollIndicator={false}
			>
				{CurrentUser.favoritesUser.map(userUid => (
					<UserMapElement key={userUid.uid} userUId={userUid.uid} />
				))}
			</ScrollView>
				</View> : null}
		
				{CurrentUser.startReadBook.length ? <View>
						<Text className='text-white text-3xl mb-4 mt-4 font-bold'>Started book 🧨</Text>
						<FavoriteFlatList data={CurrentUser.startReadBook}/>
					</View>
					: <Text className='text-white text-2xl mt-4 text-center font-bold'>	Now you don't read books</Text>}
				{CurrentUser.favoritesBook.length ? <View>
						<Text className='text-white text-3xl mb-4 mt-4 font-bold'> Favorite book 💖</Text>
						<FavoriteFlatList data={CurrentUser.favoritesBook}/>
					</View>
					: <Text className='text-white text-2xl mt-4 text-center font-bold'>	You don't have a favorite book</Text>}
				
				{CurrentUser.finishedBook.length ? <View>
						<Text className='text-white text-3xl mb-4 mt-4 font-bold'>Ended book ✅</Text>
						<FavoriteFlatList data={CurrentUser.finishedBook}/>
					</View>
					: <Text className='text-white text-2xl mt-4 text-center font-bold'>	You don't have a finished book</Text>}
			</ScrollView>
			</Layout>
	)
}

export default Favorite
