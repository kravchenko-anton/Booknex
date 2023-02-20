import I18n from 'i18n-js'
import { ComponentProps, FC, PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { en } from '../../../utils/localization/en'
import { ru } from '../../../utils/localization/ru'
import { LanguageProvider } from './languageProvider'

const Layout: FC<PropsWithChildren<ViewProps>> = ({ children, ...rest }) => {
	return (
		<SafeAreaView>
			<View className={'p-3 bg-[#121212]'} {...rest}>
				{children}
			</View>
		</SafeAreaView>
	)
}

export default Layout
