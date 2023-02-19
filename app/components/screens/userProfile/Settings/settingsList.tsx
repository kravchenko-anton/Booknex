import { Linking } from 'react-native'
import { useAction } from '../../../../hook/useAction'
import { useTypedNavigation } from '../../../../hook/useTypedNavigation'
import { useTypedSelector } from '../../../../hook/useTypedSelector'

export interface ISettingsList {
	title: string
	icon: any
}


export const SettingsList: ISettingsList[] = [{
		title: 'Profile settings',
		icon: 'person',
},
	{
		title: 'Password settings',
		icon: 'lock-closed',

},
	{
		title: 'Language settings',
		icon: 'globe',
		
	},
	{
title: 'logout',
icon: 'log-out',
// onPress: () => logout(null)
},
	{
	title: 'Report a problem',
	icon: 'alert-circle',
// onPress: () => Linking.openURL('https://t.me/AntonKravcenco')
},
	{
		title: 'Send feedback',
		icon: 'mail',
		// onPress: () => Linking.openURL('https://t.me/AntonKravcenco')
	}]
