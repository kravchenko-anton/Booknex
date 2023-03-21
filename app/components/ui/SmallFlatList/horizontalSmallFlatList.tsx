import I18n from 'i18n-js'
import LottieView from 'lottie-react-native'
import Lottie from 'lottie-react-native'
import { FC, PropsWithChildren, useRef } from 'react'
import { Animated, Platform, Text, View } from 'react-native'
import HorizontalSmallFlatlistItem from './horizontalSmallFlatlistItem'

const HorizontalSmallFlatList: FC<
	PropsWithChildren<{ data: string[]; id?: string }>
> = ({ children, data }) => {
	const flatListRef = useRef<any>()
	const scrollX = useRef(new Animated.Value(0)).current
	let animationRef = useRef<Lottie>(null)
	return (
		<Animated.FlatList
			horizontal
			extraData={data}
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
			
			ref={flatListRef}
			onContentSizeChange={() => flatListRef.current.scrollToOffset({ animated: true, offset: 0 })}
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={160}
			bounces={false}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: true }
			)}
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={({ item, index }) => {
				const inputRange = [0, 150 * index, 150 * (index + 1)]
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 0.8],
					extrapolate: 'clamp'
				})
				
				
				return <HorizontalSmallFlatlistItem scale={scale} BookId={item} />
			}}
		/>
	)
}

export default HorizontalSmallFlatList
