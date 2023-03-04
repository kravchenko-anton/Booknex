import { Animated } from 'react-native'

export interface ISmallFlatItem {
	scale: Animated.AnimatedInterpolation<string | number>
	BookId: string
}
