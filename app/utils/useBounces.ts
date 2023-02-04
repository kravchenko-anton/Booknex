import { useEffect } from 'react'
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated'

export const useScaleOnMount = () => {
	const scale = useSharedValue(0)

	useEffect(() => {
		scale.value = withSpring(1)

		return () => {
			scale.value = withSpring(0)
		}
	}, [])

	const styleAnimation = useAnimatedStyle(() => ({
		transform: [
			{
				scale: scale.value
			}
		]
	}))

	return { styleAnimation }
}
