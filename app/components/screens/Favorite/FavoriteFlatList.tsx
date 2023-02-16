import { FC, PropsWithChildren, useRef, useState } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedNavigation } from '../../../hook/useTypedNavigation'
import { BookTypes } from '../../../store/api/api.types'
import Favoriteitem from './Favoriteitem'

const AnimatedFavoriteFlatList: FC<
	PropsWithChildren<{ data: string[]; id?: string }>
> = ({ children, data }) => {
	const { navigate } = useTypedNavigation()
	const scrollY = useRef(new Animated.Value(0)).current
	
	return (
		<FlatList
			renderToHardwareTextureAndroid={true}
			data={data}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { y: scrollY } } }],
				{ useNativeDriver: false }
			)}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={<>{children}</>}
			renderItem={({ item, index }) => {
				const inputRange = [-1, 0, 150 * index, 150 * (index + 15)]
				const scale = scrollY.interpolate({
					inputRange,
					outputRange: [1, 1, 1, 0],
					extrapolate: 'clamp'
				})
				return (
					<Animated.View
						style={{ transform: [{ scale: scale }], marginVertical: 8, height: 150 }}
					>
					<Favoriteitem BookId={item}/>
					</Animated.View>
				)
			}}
		/>
	)
}

export default AnimatedFavoriteFlatList
