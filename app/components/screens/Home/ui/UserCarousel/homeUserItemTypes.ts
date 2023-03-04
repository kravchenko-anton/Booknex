import { Animated } from 'react-native'

export interface IUserHomeItem {
	scale: Animated.AnimatedInterpolation<string | number>
	uid: string
}
