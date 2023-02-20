import { FC } from 'react'
import { Text, View } from 'react-native'

export interface Istatistics {
	FirstHeading: string
	FirstDescription: string
	SecondHeading: string
	SecondDescription: string
	ThirdHeading: string | number | undefined
	ThirdDescription: string
}

const Statistics: FC<Istatistics> = props => {
	return (
		<View>
			<View className='bg-blue flex-row justify-between mt-4 p-6 rounded-md'>
				<View className='items-center justify-center w-[25%]'>
					<Text className='text-white font-bold text-2xl'>{props.FirstHeading}</Text>
					<Text className='text-gray'>{props.FirstDescription}</Text>
				</View>
				<View className='items-center justify-center w-[25%]'>
					<Text className='text-white font-bold text-2xl'>
						{props.SecondHeading}
					</Text>
					<Text className='text-gray'>{props.SecondDescription}</Text>
				</View>
				<View className='items-center justify-center w-[25%]'>
					<Text className='text-white font-bold text-2xl'>{props.ThirdHeading}</Text>
					<Text className='text-gray'>{props.ThirdDescription}</Text>
				</View>
			</View>
		</View>
	)
}

export default Statistics
