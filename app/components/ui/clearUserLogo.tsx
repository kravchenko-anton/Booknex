import { FC } from 'react'
import { Text, View } from 'react-native'

export interface IClearUserLogo {
	letter: string
	width: number
	height: number
	latterSize?: number
	rounded?: number
}

const ClearUserLogo: FC<IClearUserLogo> = (props: IClearUserLogo) => {
	const FirstLatter = props.letter ? props.letter.charAt(0).toUpperCase() : 'L'
	return (
		<View
			style={{ width: props.width, height: props.height, borderRadius: props.rounded ? props.rounded : 10000 }}
			className=' bg-gray items-center justify-center'
		>
			<Text
				className='font-bold text-white text-center'
				style={{ fontSize: props.latterSize ? props.latterSize : 40 }}
			>
				{FirstLatter}
			</Text>
		</View>
	)
}

export default ClearUserLogo
