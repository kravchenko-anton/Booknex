import RNBounceable from '@freakycoder/react-native-bounceable'
import React from 'react'
import { Animated, Image, Platform, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { EMPTY_ITEM_SIZE, ITEM_SIZE, SPACING, useCarousel } from './useCarousel'

const Carousel = () => {
	const { CarouselBook, scrollX, navigate } = useCarousel()
	return <>
		<Animated.FlatList
			bounces={false}
			keyExtractor={item => `key ${item.id}`}
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			showsHorizontalScrollIndicator={false}
			snapToInterval={ITEM_SIZE}
			snapToAlignment='start'
			scrollEventThrottle={16}
			contentContainerStyle={{ height: 420 }}
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
					outputRange: [50, 0, 50],
					extrapolate: 'clamp'
				})
				
				/*rotate*/
				const rotate = scrollX.interpolate({
					inputRange,
					outputRange: ['4deg', '0deg', '-4deg']
				})
				
				/*opacity*/
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.35, 1, 0.35]
				})
				
				/*scale*/
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.92, 1, 0.92]
				})
				
				/*opacity info block*/
				const opacityElements = scrollX.interpolate({
					inputRange,
					outputRange: [0, 1, 0]
				})
				
				return (
					<View style={{ width: ITEM_SIZE }}>
						<Animated.View
							key={item.id}
							style={{
								transform: [{ translateY: TranslateY }, { rotate }, { scale }],
								marginHorizontal: SPACING,
								alignItems: 'center',
								opacity
							}}
						>
							<View
								className='w-full'>
								<RNBounceable onPress={() =>
									navigate('BookPage', {
										id: item.id
									})
								}>
									<Image
										source={{ uri: item.Image }}
										className='w-full rounded-xl'
										style={{ height: ITEM_SIZE * 1.4 }}
									/>
								</RNBounceable>
							</View>
							
							<Animated.View style={{
								opacity: opacityElements,
								'alignItems': 'center',
								'justifyContent': 'center',
								width: ITEM_SIZE * 0.9
							}}>
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
							</Animated.View>
						</Animated.View>
					</View>
				
				)
			}}
		/>
	</>
}

export default Carousel
