import { StatusBar } from 'expo-status-bar'
import { FC, PropsWithChildren } from 'react'
import { Pressable, Text, View } from 'react-native'
import Modal from 'react-native-modal'

export interface IModal {
	isVisible: any
	setIsVisible: any
	title: string
	height: number | string
}

const ModalPopup: FC<PropsWithChildren<IModal>> = ({
	isVisible,
	setIsVisible,
	children,
	height,
	title
}) => {
	return (
		<Modal
			className='m-0 p-0'
			style={{ justifyContent: 'flex-end', flex: 1, height: 100 }}
			onBackdropPress={() => setIsVisible(false)}
			onBackButtonPress={() => setIsVisible(false)}
			isVisible={isVisible}
			swipeDirection='down'
			renderToHardwareTextureAndroid={true}
			statusBarTranslucent={true}
			onSwipeComplete={() => setIsVisible(!isVisible)}
			animationIn='bounceInUp'
			animationOut='bounceOutDown'
			animationInTiming={900}
			animationOutTiming={500}
			backdropTransitionInTiming={1000}
			backdropTransitionOutTiming={500}
		>
			<View style={{ height }} className='p-3 bg-[#181818] rounded-3xl'>
				<View className='bg-[#bbb] mb-4 w-[60px] h-[5px] mx-auto rounded-md' />
				{children}
			</View>
		</Modal>
	)
}

export default ModalPopup
