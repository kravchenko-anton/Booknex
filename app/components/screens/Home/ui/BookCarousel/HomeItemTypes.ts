import { Animated } from 'react-native'

export interface IHomeitem {
	BookId: string
	scale: Animated.AnimatedInterpolation<string | number>
}
