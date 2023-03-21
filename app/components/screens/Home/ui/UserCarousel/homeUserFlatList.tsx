import { FC, PropsWithChildren, useRef } from 'react'
import { Animated, Platform } from 'react-native'
import { Iuser } from '../../../../../store/api/api.types'
import HomeUserListItem from './homeUserListItem'

const AnimatedUserHomeFlatList: FC<
	PropsWithChildren<{ data: Iuser[]; id?: string }>
> = ({ children, data }) => {
	
	const scrollX = useRef(new Animated.Value(0)).current
	return (
		<Animated.FlatList
			horizontal
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={122}
			bounces={false}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: true }
			)}
			scrollEventThrottle={1}
			showsHorizontalScrollIndicator={false}
			data={data}
			renderItem={({ item, index }) => {
				const inputRange = [0, 0, 150 * index, 150 * (index + 1)]
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
					extrapolate: 'clamp'
				})
				
				
				return <HomeUserListItem scale={scale} uid={item.uid} />
			}}
		/>
	)
}

export default AnimatedUserHomeFlatList
