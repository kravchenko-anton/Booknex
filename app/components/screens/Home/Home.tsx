import RNBounceable from '@freakycoder/react-native-bounceable'
import { Picker } from '@react-native-picker/picker'
import { StatusBar } from 'expo-status-bar'
import I18n from 'i18n-js'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../hook/useTypedSelector'
import { useFetchMyProfileQuery } from '../../../store/api/user/query'
import { ElementBottomAnimation, ElementBottomToTopAnimation } from '../../../utils/Animation'
import ClearUserLogo from '../../ui/clearUserLogo'
import Layout from '../../ui/Layout/Layout'
import Loader from '../../ui/Loader'
import HorizontalSmallFlatList from '../../ui/SmallFlatList/horizontalSmallFlatList'
import AnimatedHomeFlatList from './ui/BookCarousel/HomeFlatList'
import ContinueRead from './ui/continueRead'
import AnimatedUserHomeFlatList from './ui/UserCarousel/homeUserFlatList'

const Home = () => {
	const { user } = useTypedSelector(state => state.auth)
	const { data: CurrentUser } = useFetchMyProfileQuery(user?.uid)
	const { navigate } = useTypedNavigation()
	const [selectFavoriteBook, setSelectFavoriteBook] = React.useState(true)
	if (!CurrentUser) return <Loader />
	return (
		<Layout className=''>
			<StatusBar backgroundColor='#121212' />
			<ScrollView showsVerticalScrollIndicator={false} className='p-0 m-0'>
				
				<View className='flex-row items-center justify-between mb-5'>
					<View>
						<Text className='text-white text-xl font-bold'>{I18n.t('hi')}, {CurrentUser.name}</Text>
						<Text className='text-gray text-md mt-1 font-thin'>{I18n.t('They good day for read new book!')}</Text>
					</View>
					<RNBounceable onPress={() => navigate('UserProfile')} className=' p-0'>
						{CurrentUser.photoURL ? (
							<Image
								source={{ uri: CurrentUser.photoURL }}
								className='w-[70px] h-[70px] rounded-full'
							/>
						) : (
							<ClearUserLogo latterSize={30} rounded={8} letter={CurrentUser.name} width={70} height={70} />
						)}
					</RNBounceable>
				</View>
				<Text className='text-2xl text-white font-bold mb-4'>{I18n.t('Library')} 📚 </Text>
				<AnimatedHomeFlatList
					data={CurrentUser.startReadBook && CurrentUser.startReadBook.length ? [...CurrentUser.startReadBook].reverse() : []} />
				<Animatable.View delay={300} animation={selectFavoriteBook ? ElementBottomAnimation : ElementBottomToTopAnimation}>
					<ContinueRead />
				</Animatable.View>
				
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
				<Animatable.View delay={300} animation={selectFavoriteBook ? ElementBottomAnimation : ElementBottomToTopAnimation}
				                 className='mb-3'>
					<HorizontalSmallFlatList data={selectFavoriteBook ? CurrentUser.favoritesBook : CurrentUser.finishedBook} />
				
				</Animatable.View>
			
			
			</ScrollView>
		</Layout>
	)
}

export default Home
