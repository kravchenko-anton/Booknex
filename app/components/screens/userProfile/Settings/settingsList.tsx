import { Feather } from '@expo/vector-icons'
import I18n from 'i18n-js'
import { FC, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'
import { useAction } from '../../../../hook/useAction'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../../hook/useTypedSelector'
import DialogPopup from '../../../ui/DialogPopup'

export interface ISettingsList {
	title: string
	icon: any
	onPress: () => void
}

export const SettingsList: FC<{ uid: string }> = ({ uid }) => {
	const { navigate } = useTypedNavigation()
	const { logout } = useAction()
	const [DialogPopupVisible, setDialogPopupVisible] = useState(false)
	const settingsArray: ISettingsList[] = [
		{
			title: I18n.t('ProfileSettings'),
			icon: 'user',
			onPress: () => navigate('UserSettings', { uid })
		},
		{
			title: I18n.t('PasswordSettings'),
			icon: 'lock',
			onPress: () => navigate('PasswordSettings', { uid })
		},
		{
			title: I18n.t('LanguageSettings'),
			icon: 'globe',
			onPress: () => navigate('LanguageSettings', { uid })
		},

		{
			title: I18n.t('ReportAProblem'),
			icon: 'alert-circle',
			onPress: () => Linking.openURL('https://t.me/AntonKravcenco')
		},
		{
			title: I18n.t('SendFeedback'),
			icon: 'mail',
			onPress: () => Linking.openURL('https://t.me/AntonKravcenco')
		},
		{
			title: I18n.t('Logout'),
			icon: 'log-out',
			onPress: () => setDialogPopupVisible(true)
		}
	]
	return (
		<View>
			<DialogPopup
				type='warning'
				OnPressOK={() => {
					logout(null)
					setDialogPopupVisible(false)
				}}
				OnPressCancel={() => setDialogPopupVisible(false)}
				isVisible={DialogPopupVisible}
				setISVisible={setDialogPopupVisible}
				title={I18n.t('LOGOUT')}
				description={I18n.t('Are you sure you want to logout from your account?')}
			/>
			{settingsArray.map(item => {
				return (
					<TouchableOpacity key={item.title} className='' onPress={item.onPress}>
						<View className='flex-row justify-between bg-blue item-center mb-2 rounded-md mt-2 p-4'>
							<View className='flex-row item-center'>
								<Feather name={item.icon} size={24} color='white' />
								<Text className='text-white ml-4 text-xl font-bold'>{item.title}</Text>
							</View>
							<Feather name='arrow-right' size={24} color='white' />
						</View>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
