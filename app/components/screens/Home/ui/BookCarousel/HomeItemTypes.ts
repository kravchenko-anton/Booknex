import { Animated } from 'react-native'

export interface IHomeitem {
	BookId: string
	rotateY: Animated.AnimatedInterpolation<string>
	rotateX: Animated.AnimatedInterpolation<string>
	scale: Animated.AnimatedInterpolation<string | number>
}
