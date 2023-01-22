import { MaterialIcons } from '@expo/vector-icons'
import { FC, PropsWithChildren } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

export interface IModal {
	isVisible: any
	setIsVisible: any
	title: string,
	height: number | string
}

const ModalPopup: FC<PropsWithChildren<IModal>> = ({ isVisible, setIsVisible, children, title, height }) => {
	return <View>
		<Modal hardwareAccelerated={true} animationType='slide' transparent={true} visible={isVisible}>
			<View style={{ height: height }} className=' absolute z-50 bottom-0 w-full'>
				<View className='flex-row p-3 rounded-t-xl items-center justify-between bg-blue'>
					<Text className='text-white font-bold text-lg'>{title}</Text>
					<Pressable onPress={() => setIsVisible(!isVisible)}>
						<MaterialIcons name='close' color='#fff' size={22} />
					</Pressable>
				</View>
				<View className='p-3 bg-whiteGray h-full'>
					{children}
				</View>
			</View>
		</Modal>
	
	</View>
}

export default ModalPopup