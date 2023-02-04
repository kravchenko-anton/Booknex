import { FC } from 'react'
import { Text, View } from 'react-native'

export interface IClearUserLogo {
	letter: string
	width: number
	height: number
}

const ClearUserLogo: FC<IClearUserLogo> = ({ letter, width, height }) => {
	const FirstLatter = letter.charAt(0).toUpperCase() || 'L'
	return (
		<View
			style={{ width: width, height: height }}
			className=' bg-gray  rounded-full items-center justify-center '
		>
			<Text className='font-bold text-white text-4xl'>{FirstLatter}</Text>
		</View>
	)
}

export default ClearUserLogo
