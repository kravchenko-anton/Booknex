import I18n from 'i18n-js'
import LottieView from 'lottie-react-native'
import Lottie from 'lottie-react-native'
import { FC, PropsWithChildren, useRef } from 'react'
import { Animated, Platform, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import HorizontalSmallFlatlistItem from './horizontalSmallFlatlistItem'

const HorizontalSmallFlatList: FC<
	PropsWithChildren<{ data: string[]; id?: string }>
> = ({ children, data }) => {
	let listRef: any = useRef<FlatList | any>(null)
	const scrollX = useRef(new Animated.Value(0)).current
	let animationRef = useRef<Lottie>(null)
	return (
		<Animated.FlatList
			horizontal
			initialNumToRender={3}
			extraData={data}
			renderToHardwareTextureAndroid={true}
			ListEmptyComponent={() => <View className='w-[150px] h-[250px] items-center bg-blue rounded-lg'>
				<LottieView
					loop={true}
					renderMode={Platform.OS === 'ios' ? 'HARDWARE' : 'SOFTWARE'}
					autoPlay={false}
					ref={animationRef}
					onLayout={() => {
						animationRef.current?.play()
					}}
					source={require('../../../assets/65089-book-search.json')}
				/>
				<Text className='text-white absolute bottom-5 text-xl text-center'>{I18n.t('No Books')} 🥱</Text>
			</View>
			}
			
			ref={ref => (listRef = ref)}
			onContentSizeChange={() => listRef.scrollToOffset({ animated: true, offset: 0 })}
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={160}
			bounces={false}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: true }
			)}
			scrollEventThrottle={1}
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={({ item, index }) => {
				const inputRange = [0, 0, 150 * index, 150 * (index + 10)]
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
					extrapolate: 'clamp'
				})
				
				
				return <HorizontalSmallFlatlistItem scale={scale} BookId={item} />
			}}
		/>
	)
}

export default HorizontalSmallFlatList
