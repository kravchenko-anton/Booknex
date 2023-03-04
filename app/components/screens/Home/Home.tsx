import { AntDesign } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { StatusBar } from 'expo-status-bar'
import I18n from 'i18n-js'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchMyProfileQuery } from '../../../store/api/user/query'
import { ElementBottomAnimation, ElementBottomToTopAnimation } from '../../../utils/Animation'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import AnimatedFavoriteFlatList from '../Favorite/ui/FavoriteFlatList'
import AnimatedHomeFlatList from './ui/BookCarousel/HomeFlatList'
import ContinueRead from './ui/continueRead'
import AnimatedUserHomeFlatList from './ui/UserCarousel/homeUserFlatList'

const Home = () => {
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchMyProfileQuery(user?.uid)
	const { navigate } = useTypedNavigation()
	const [selectFavoriteBook, setSelectFavoriteBook] = React.useState(true)
	console.log(CurrentUser)
	if (!CurrentUser) return <Loader />
	
	return (
		<Layout className=''>
			<StatusBar backgroundColor='#121212' />
			<ScrollView showsVerticalScrollIndicator={false} className='p-0 m-0'>
				
				<View className='flex-row items-center justify-between'>
					<TouchableOpacity onPress={() => navigate('UserProfile')} className='flex-row items-center'>
						<View className='mr-3 p-0'>
							{CurrentUser.photoURL ? (
								<Image
									source={{ uri: CurrentUser.photoURL }}
									className='w-[50px] h-[50px] rounded-lg'
								/>
							) : (
								<ClearUserLogo latterSize={30} rounded={8} letter={CurrentUser.name} width={50} height={50} />
							)}
						</View>
						<Text className='text-white text-xl font-bold'>{I18n.t('hi')}, {CurrentUser.name}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigate('Search')} className='bg-blue p-2 rounded-lg'>
						<AntDesign name='search1' size={24} color='white' />
					</TouchableOpacity>
				
				</View>
				<Text className='text-2xl text-white font-bold mt-4 mb-4'>{I18n.t('Library')} 📚 </Text>
				<AnimatedHomeFlatList
					data={CurrentUser.startReadBook && CurrentUser.startReadBook.length ? [...CurrentUser.startReadBook].reverse() : []} />
				
				<ContinueRead />
				
				{CurrentUser.favoritesUser && CurrentUser.favoritesUser.length ? <>
					<Text className='text-2xl text-white font-bold mt-4 mb-4'>{I18n.t('Favorite Authors')} </Text>
					<AnimatedUserHomeFlatList data={CurrentUser.favoritesUser} />
				</> : null}
				
				
				<View className='mt-4 p-0'>
					<Picker
						mode='dropdown'
						dropdownIconColor='white'
						dropdownIconRippleColor='#121212'
						accessibilityIgnoresInvertColors={true}
						collapsable={true}
						accessibilityLiveRegion={'none'}
						selectedValue={selectFavoriteBook}
						onValueChange={(itemValue) =>
							setSelectFavoriteBook(itemValue)
						}>
						<Picker.Item label={I18n.t('Favorite') + ' ❤'} color='white' value={true}
						             style={{
							             backgroundColor: '#121212',
							             fontSize: 20,
							             fontWeight: '600',
							             zIndex: 1000
						             }} />
						<Picker.Item label={I18n.t('Finish book') + ' 🧐'} color='white'
						             style={{
							             backgroundColor: '#121212',
							             fontSize: 20,
							             fontWeight: '600'
						             }}
						             value={false} />
					</Picker>
				</View>
				<Animatable.View delay={300} animation={selectFavoriteBook ? ElementBottomAnimation : ElementBottomToTopAnimation}>
					<AnimatedFavoriteFlatList data={selectFavoriteBook ? CurrentUser.favoritesBook : CurrentUser.finishedBook} />
				
				</Animatable.View>
			
			
			</ScrollView>
		</Layout>
	)
}

export default Home
