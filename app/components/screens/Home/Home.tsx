import React from 'react'
import { Animated, Image, Pressable, Text, useWindowDimensions, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'
import { useFetchBooksQuery } from '../../../store/api/books'
import Layout from '../../ui/Layout/Layout'

const Home = () => {
	const { data: book, isLoading, error } = useFetchBooksQuery(null)
	const { navigate } = useTypedNavigation()
	const CarouselBook = [{ key: 'spacer' }, ...(book ? book : []), { key: 'rightSpacer' }] as BookTypes[]
	const scrollX = React.useRef(new Animated.Value(0)).current
	const { width, height } = useWindowDimensions()
	const Item_Width = width * 0.75
	const SPACING = 2
	const EMPTY_ITEM_SIZE = (Item_Width) / 10
	return <Layout>
		<View className='h-full'>
			<Animated.FlatList
				bounces={false} decelerationRate={0} showsHorizontalScrollIndicator={false}
				snapToInterval={Item_Width + SPACING} scrollEventThrottle={16} renderToHardwareTextureAndroid={true}
				contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} horizontal
				data={CarouselBook}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
				renderItem={({ item, index }) => {
					if (!item.Name) return <View style={{ width: EMPTY_ITEM_SIZE }} />
					const inputRange = [
						(index - 2) * Item_Width,
						(index - 1) * Item_Width,
						index * Item_Width
					]
					const TranslateY = scrollX.interpolate({
						inputRange,
						outputRange: [0, 50, 0],
						extrapolate: 'clamp'
					})
					return <Animated.View key={item.id} style={{
						width: Item_Width, transform: [{ translateY: TranslateY }], marginHorizontal: SPACING,
						padding: SPACING * 2,
						alignItems: 'center'
					}}>
						<Pressable className='w-full' onPress={event => navigate('BookPage', {
							id: item.id
						})}>
							<Image source={{ uri: item.Image }}
							       className='w-full rounded-xl' style={{ height: Item_Width * 1.6 }} />
						</Pressable>
						<Text numberOfLines={1} className='text-white text-3xl font-bold mt-2'>{item.Name}</Text>
						<View className='flex-row items-center'>
							<AirbnbRating
								size={18}
								defaultRating={Object.values(item.comments).reduce((t, { rating }) => t + rating, 0) / (item.comments.length ? item.comments.length : item.comments.constructor.length)}
								count={5}
								showRating={false}
								isDisabled={true}
							/>
							<Text className='text-white text-xl font-bold'>/ 5</Text>
						</View>
						<View className='mt-2 flex-wrap flex-row'>
							{item.genre.map((item: string) => (
								<Text key={item}
								      className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'>{item}</Text>
							))}
						</View>
					</Animated.View>
				}} />
		</View>
	</Layout>
}

export default Home
