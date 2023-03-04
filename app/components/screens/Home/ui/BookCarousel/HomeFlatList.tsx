import I18n from 'i18n-js'
import Lottie from 'lottie-react-native'
import { FC, useRef } from 'react'
import { Animated, Platform, Text, View } from 'react-native'
import HomeListItem from './HomeListItem'

const AnimatedHomeFlatList: FC<{ data: string[]; id?: string }> = ({ data }) => {
	const scrollX = useRef(new Animated.Value(0)).current
	const animationRef = useRef<Lottie>(null)
	return (
		<Animated.FlatList
			horizontal
			ListEmptyComponent={() =>
				<View className='w-[190px] h-[270px] bg-blue rounded-lg'>
					<Lottie
						loop={false}
						autoPlay={false}
						progress={animationRef.current}
						ref={animationRef}
						onLayout={() => animationRef.current?.play(30, 209)}
						source={require('./../../../../../assets/99349-girl-with-books.json')}
					/>
					<Text className='text-white mt-2 text-2xl text-center'>{I18n.t('No Books')} 🥱</Text>
				</View>
			}
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={200}
			bounces={false}
			keyExtractor={(item, index) => {
				return index.toString()
			}}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: false }
			)}
			scrollEventThrottle={1}
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={({ item, index }) => {
				const inputRange = [0, 0, 200 * index, 200 * (index * 1.1 + 1)]
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
					extrapolate: 'extend'
				})
				
				return <HomeListItem scale={scale} BookId={item} />
			}}
		/>
	)
}

export default AnimatedHomeFlatList
