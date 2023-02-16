import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text } from 'react-native'
import Dialog, {
	DialogButton,
	DialogContent,
	DialogFooter,
	FadeAnimation
} from 'react-native-popup-dialog'
interface IDialogPopup {
	description: string
	title: string
	isVisible: boolean
	OnPressOK: () => void
	OnPressCancel: () => void
	setISVisible: React.Dispatch<React.SetStateAction<boolean>>

	type: 'danger' | 'warning'
}
const DialogPopup: FC<IDialogPopup> = props => {
	return (
		<Dialog
			dialogStyle={{ backgroundColor: '#1E212C', borderRadius: 10 }}
			dialogAnimation={new FadeAnimation({ animationDuration: 200 })}
			visible={props.isVisible}
			onTouchOutside={() => {
				props.setISVisible(false)
			}}
			footer={
				<DialogFooter>
					<DialogButton
						textStyle={{ color: 'gray' }}
						text='CANCEL'
						onPress={props.OnPressCancel}
					/>
					<DialogButton
						textStyle={{ color: 'white' }}
						text='OK'
						onPress={props.OnPressOK}
					/>
				</DialogFooter>
			}
		>
			<DialogContent style={{ alignItems: 'center', padding: 8 }}>
				{props.type === 'danger' ? (
					<MaterialIcons name='error-outline' size={50} color='red' />
				) : (
					<AntDesign name='warning' size={50} color='yellow' />
				)}
				<Text className='text-white text-2xl font-bold mt-4'>{props.title}</Text>
				<Text className='text-gray text-center text-lg'>{props.description}</Text>
			</DialogContent>
		</Dialog>
	)
}

export default DialogPopup
