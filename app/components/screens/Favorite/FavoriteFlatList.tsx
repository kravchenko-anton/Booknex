import { FC, PropsWithChildren, useRef, useState } from 'react'
import { Animated, Image, Platform, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'
import Favoriteitem from './Favoriteitem'

const AnimatedFavoriteFlatList: FC<
	PropsWithChildren<{ data: string[]; id?: string }>
> = ({ children, data }) => {
	const scrollX = useRef(new Animated.Value(0)).current

	return (
		<FlatList
			horizontal
			decelerationRate={Platform.OS == 'ios' ? 0 : 0.92}
			snapToInterval={160}
			bounces={false}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { x: scrollX } } }],
				{ useNativeDriver: false }
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
						<Favoriteitem scale={scale} BookId={item} />
				)
			}}
		/>
	)
}

export default AnimatedFavoriteFlatList
