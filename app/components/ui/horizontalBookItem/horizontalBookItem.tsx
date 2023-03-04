import { FC, PropsWithChildren } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { horizontalBookItemTypes } from './horizontalBookItemTypes'


const HorizontalBookItem: FC<PropsWithChildren<horizontalBookItemTypes>> = (props) => {
	return <View className=''>
		<View className=' flex-row rounded-md'>
			<Image source={{ uri: props.imageUrl }} className='w-[150px] rounded-lg h-[230px]' />
			<View className='flex-1'>
				<View className='ml-3 max-h-[230px] h-[230px] justify-end'>
					<Text numberOfLines={1} className='text-white font-bold text-3xl'>{props.title}</Text>
					<Text numberOfLines={1} className='text-white font-bold mb-2 text-lg'> by <Text
						className='text-primary'>{props.author}</Text></Text>
					{props.children}
					<TouchableOpacity onPress={props.navigate} className='bg-blue w-[160px] items-center rounded-lg p-2'><Text
						className='text-white font-bold text-[22px]'>{props.buttonText}</Text></TouchableOpacity>
				</View>
			</View>
		</View>
	</View>
}

export default HorizontalBookItem
