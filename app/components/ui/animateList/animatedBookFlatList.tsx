import RNBounceable from '@freakycoder/react-native-bounceable'
import { FC, useRef } from 'react'
import { Animated, Image, Platform, View } from 'react-native'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'

const AnimatedBookFlatList: FC<{ data: BookTypes[] }> = ({ data }) => {
	const { navigate } = useTypedNavigation()
	const scrollX = useRef(new Animated.Value(0)).current
	return (
		<View>
			<Animated.FlatList
				horizontal
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
					
					return (
						<Animated.View style={{ transform: [{ scale }], marginRight: 10 }}>
							<RNBounceable onPress={() => navigate('BookPage', { id: item.id })}>
								<Image
									className='w-[150px] object-contain h-[250px] rounded-lg '
									source={{ uri: item.Image }}
								/>
							</RNBounceable>
						</Animated.View>
					)
				}}
			/>
		</View>
	)
}

export default AnimatedBookFlatList
