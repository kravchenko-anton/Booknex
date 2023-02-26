import { Feather, MaterialIcons } from '@expo/vector-icons'
import { a } from '@gxl/epub-parser/lib/mdConverters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from 'i18n-js'
import React, { useTransition } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { en } from '../../../../utils/localization/en'
import { ru } from '../../../../utils/localization/ru'
import Header from '../../../ui/header'
import Layout from '../../../ui/Layout/Layout'
import * as Updates from 'expo-updates'
const LanguageSettings = () => {
	return (
		<Layout>
			<Header className='mb-4 mt-4'>
				<Text className='text-white text-2xl font-bold'>
					{I18n.t('LanguageSettings')}
				</Text>
			</Header>

			<Text className='mt-2 font-bold text-2xl text-white mb-8'>
				{I18n.t('ChoseLanguage')} 👇
			</Text>
			<View className='flex-row items-center justify-between'>
				<TouchableOpacity
					onPress={async () => {
						await AsyncStorage.setItem('language', 'en')
						Updates.reloadAsync()
					}}
					className='bg-blue rounded-lg p-4'
				>
					<Text
						style={{ color: I18n.currentLocale() === 'en' ? '#702DF5' : 'white' }}
						className='text-white text-2xl font-bold'
					>
						English 🌎
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={async () => {
						await AsyncStorage.setItem('language', 'ru')
						Updates.reloadAsync()
					}}
					className='bg-blue p-4 rounded-lg'
				>
					<Text
						style={{ color: I18n.currentLocale() === 'ru' ? '#702DF5' : 'white' }}
						className='text-white text-2xl font-bold'
					>
						Русский 💀
					</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	)
}

export default LanguageSettings
