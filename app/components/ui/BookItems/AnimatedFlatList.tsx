import I18n from 'i18n-js'
import LottieView from 'lottie-react-native'
import Lottie from 'lottie-react-native'
import { FC, PropsWithChildren, useRef } from 'react'
import { Animated, Image, Platform, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'

const AnimatedFlatList: FC<
	PropsWithChildren<{ data: BookTypes[]; id?: string, contentHeight: number }>
> = ({ children, data, contentHeight }) => {
	const { navigate } = useTypedNavigation()
	const scrollY = useRef(new Animated.Value(0)).current
	const animationRef = useRef<Lottie>(null)
	let listRef: any = useRef<FlatList | any>(null)
	return (
		<Animated.FlatList
			data={data}
			ref={ref => (listRef = ref)}
			extraData={data}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { y: scrollY } } }],
				{ useNativeDriver: false }
			)}
			ListEmptyComponent={() => (
				<View className='w-[100%] mt-4 h-[250px] bg-blue rounded-lg items-center'>
					<LottieView
						renderMode={Platform.OS === 'ios' ? 'HARDWARE' : 'SOFTWARE'}
						loop={true}
						ref={animationRef}
						style={{ height: 200, width: 300 }}
						onLayout={() => animationRef.current?.play()}
						source={require('./../../../assets/98849-book-lover.json')}
					/>
					<Text
						className='absolute bottom-5 text-2xl text-white text-center justify-center'>{I18n.t('You not have books')} 🙄</Text>
				</View>
			)}
			ListHeaderComponent={<>{children}</>}
			renderItem={({ item, index }) => {
				const inputRange = [0, index, index * 166 + contentHeight, 166 * (index + 2) + contentHeight]
				const scale = scrollY.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
					extrapolate: 'clamp'
				})
				return (
					<Animated.View
						key={item.id}
						style={{ transform: [{ scale: scale }], marginVertical: 8, height: 150 }}
					>
						
						<Pressable onPress={() => navigate('BookPage', { id: item.id })} className='w-full flex-row'>
							<Image
								source={{ uri: item.Image }}
								className='w-[100px] object-contain h-[150px] rounded-lg '
							/>
							<View className='pl-4 flex-1'>
								<Text
									className='text-white overflow-ellipsis mt-2 text-2xl  font-bold'
									numberOfLines={1}
								>
									{item.Name}
								</Text>
								<Text numberOfLines={1} className='text-whiteGray text-lg w-5/6 mb-1'>
									{item.autor}
								</Text>
								<View className='flex-row gap-1 items-center'>
									<Text className='text-gray w-[80%] text-md' numberOfLines={2}>
										{item.description}
									</Text>
								</View>
								<View className='mt-2 flex-wrap flex-row'>
									{item.genre.map((item: any) => (
										<Text
											key={item}
											className='text-white text-md bg-blue rounded-lg mr-1 p-2 mb-2'
										>
											{item}
										</Text>
									))}
								</View>
							</View>
						</Pressable>
					</Animated.View>
				)
			}}
		/>)
}

export default AnimatedFlatList
