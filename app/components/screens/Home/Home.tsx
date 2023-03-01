import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import React from 'react'
import { Animated, Image, Platform, Pressable, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'
import {
	useFetchAllBooksQuery,
	useFetchBooksQuery
} from '../../../store/api/book/query'
import Layout from '../../ui/Layout/Layout'
import { EMPTY_ITEM_SIZE, ITEM_SIZE, SPACING } from './useCarousel'

const Home = () => {
	const { data: book } = useFetchAllBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const CarouselBook = [
		{ id: 'first' } as BookTypes,
		...(book ? book.slice(0, 10) : []),
		{ id: 'last' } as BookTypes
	]
	const scrollX = React.useRef(new Animated.Value(0)).current
	return (
		<Layout className='h-full p-0 items-center justify-center'>
			<Animated.FlatList
				bounces={false}
				keyExtractor={item => `key ${item.id}`}
				decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
				showsHorizontalScrollIndicator={false}
				snapToInterval={ITEM_SIZE}
				snapToAlignment='start'
				scrollEventThrottle={16}
				contentContainerStyle={{ alignItems: 'center' }}
				renderToHardwareTextureAndroid
				horizontal
				data={CarouselBook}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				renderItem={({ item, index }) => {
					if (!item.Name) return <View style={{ width: EMPTY_ITEM_SIZE }} />
					const inputRange = [
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE
					]
					const TranslateY = scrollX.interpolate({
						inputRange,
						outputRange: [100, 50, 100],
						extrapolate: 'clamp'
					})
					return (
						<View style={{ width: ITEM_SIZE }}>
							<Animated.View
								key={item.id}
								style={{
									transform: [{ translateY: TranslateY }],
									marginHorizontal: SPACING,
									alignItems: 'center'
								}}
							>
								<Pressable
									className='w-full'
									onPress={event =>
										navigate('BookPage', {
											id: item.id
										})
									}
								>
									<Image
										source={{ uri: item.Image }}
										className='w-full rounded-xl'
										style={{ height: ITEM_SIZE * 1.3 }}
									/>
								</Pressable>
								<Text
									numberOfLines={1}
									className='text-center text-white w-full text-3xl font-bold mt-2'
								>
									{item.Name}
								</Text>
								<View className='flex-row items-center'>
									<AirbnbRating
										size={18}
										defaultRating={
											Object.values(item.comments).reduce(
												(t, { rating }) => t + rating,
												0
											) /
											(item.comments.length
												? item.comments.length
												: item.comments.constructor.length)
										}
										count={5}
										showRating={false}
										isDisabled={true}
									/>
									<Text className='text-white text-xl font-bold'>/ 5</Text>
								</View>
								<View className='mt-2 flex-wrap flex-row'>
									{item.genre.map((item: string) => (
										<Text
											key={item}
											className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
										>
											{item}
										</Text>
									))}
								</View>
							</Animated.View>
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default Home
