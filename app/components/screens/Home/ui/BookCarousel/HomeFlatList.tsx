import I18n from 'i18n-js'
import Lottie from 'lottie-react-native'
import { FC, useRef } from 'react'
import { Animated, Platform, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import HomeListItem from './HomeListItem'

const AnimatedHomeFlatList: FC<{ data: string[]; id?: string }> = ({ data }) => {
	const scrollX = useRef(new Animated.Value(0)).current
	const animationRef = useRef<Lottie>(null)
	let listRef: any = useRef<FlatList | any>(null)
	return (
		<Animated.FlatList
			horizontal
			ref={ref => (listRef = ref)}
			extraData={data}
			initialNumToRender={30}
			renderToHardwareTextureAndroid={true}
			ListEmptyComponent={() => (
				<View className='w-[200px] h-[290px] bg-blue rounded-lg items-center'>
					<Lottie
						renderMode={Platform.OS === 'ios' ? 'HARDWARE' : 'SOFTWARE'}
						loop={true}
						style={{ height: 210 }}
						autoPlay={false}
						ref={animationRef}
						onLayout={() => animationRef.current?.play()}
						source={require('./../../../../../assets/101674-science-lover.json')}
					/>
					<Text className='text-white absolute font-bold bottom-5 mt-2 text-2xl text-center'>{I18n.t('No Books')} 😬</Text>
				</View>
			)}
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={200}
			bounces={false}
			scrollEnabled={data.length > 1}
			keyExtractor={(item, index) => {
				return index.toString()
			}}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: false }
			)}
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={({ item, index }) => {
				const inputRange = [0, 0, 200 * index, 200 * (index * 1.1 + 1)]
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0.3],
					extrapolate: 'extend'
				})
				
				return <HomeListItem scale={scale} BookId={item} />
			}}
		/>
	)
}

export default AnimatedHomeFlatList
