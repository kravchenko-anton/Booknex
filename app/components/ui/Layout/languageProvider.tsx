import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import { ComponentProps, useEffect, useState } from 'react'
import { View } from 'react-native'
import { en } from '../../../utils/localization/en'
import { ru } from '../../../utils/localization/ru'
import * as Localization from 'expo-localization'
export const LanguageProvider = ({ children }: ComponentProps<any>) => {
	const [language, setLanguage] = useState('en')
	useEffect(() => {
		const getLanguage = async () => {
			const lang = await AsyncStorage.getItem('language')
			setLanguage(lang ? lang : 'en')
		}

		getLanguage()
	}, [language])

	I18n.translations = { en, ru }
	I18n.locale = language
	I18n.fallbacks = true
	return <>{children}</>
}
