import { Feather } from '@expo/vector-icons'
import { FC, PropsWithChildren } from 'react'
import { View, ViewProps } from 'react-native'
import { useTypedNavigation } from '../../hook/useTypedNavigation'

const Header:FC<PropsWithChildren<ViewProps>> = ({children, ...rest}) => {
	const {goBack} = useTypedNavigation()
	return <View className='flex-row justify-between items-center' {...rest}>
		<Feather
			onPress={() => goBack()}
			name='arrow-left'
			size={24}
			color='white'
		/>
		
		{children}
	</View>
}

export default Header
