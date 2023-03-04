import { Theme } from '@epubjs-react-native/core'
import I18n from 'i18n-js'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { IToc } from './settingsTypes'

const TocSettings = (props: IToc) => {
	return (
		<View className='mt-4 mb-4'>
			<Text className='text-white text-2xl mb-4'>{I18n.t('Characters')}</Text>
			{props.toc.map(toc => (
				<TouchableOpacity
					onPress={() => props.goToLocation(toc.href)}
					key={toc.id}
					style={{
						backgroundColor:
							props.theme.body.background == '#121212' ? 'gray' : '#1E212C'
					}}
					className='p-0 m-0 min-h-[40px] justify-center  rounded-lg pl-4 mb-2 '
				>
					<Text className='text-white text-md p-0 m-0'>{toc.label}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default TocSettings
